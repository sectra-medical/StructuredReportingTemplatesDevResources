import * as React from "react";
import {SectraCanvasProps} from "../index";


export interface SectraCanvasState {
    imageData: string;
}

export interface IOffset {
    offsetX: number;
    offsetY: number;
}

export interface ILine {
    start: IOffset;
    stop: IOffset;
}

export interface IPosition {
    x: number;
    y: number;
}

export class SectraCanvas extends React.Component<SectraCanvasProps, SectraCanvasState> {
    static defaultProps = {
        paintType: "Brush",
        paintColor: "#fd4545"
    }

    private isPainting: boolean;
    private canvas: HTMLCanvasElement;
    private prevPos: IOffset;
    private line: ILine[];
    private ctx: CanvasRenderingContext2D;
    private sprayInterval: number;
    private sprayCenter: IPosition;

    constructor(props: SectraCanvasProps, context: any) {
        super(props, context);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.spray = this.spray.bind(this);
        this.paint = this.paint.bind(this);
        this.loadDefaultImage = this.loadDefaultImage.bind(this);
        this.storeImageData = this.storeImageData.bind(this);
        this.state = { imageData: ''}
        this.line = [];
    }

    private onMouseDown(event: React.MouseEvent) {
        if (this.props.paintType == "Brush") {
            const nativeEvent = event.nativeEvent;
            this.isPainting = true;
            this.prevPos = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
        } else if (this.props.paintType == "Spray") {
            this.sprayCenter = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
            this.sprayInterval = setInterval(this.spray); 
        }
    }

    private getRandomOffset() {
        let radius = 8;
        let randomAngle = Math.random() * 360;
        let randomRadius = Math.random() * radius;
        return {x: Math.cos(randomAngle) * randomRadius, y: Math.sin(randomAngle) * randomRadius}
    }

    private spray() {
        let centerX = this.sprayCenter.x, centerY = this.sprayCenter.y;
        let density = 2;
        this.ctx.fillStyle = this.props.paintColor;
        for (let i = 0; i < density; i++) {
            let offset = this.getRandomOffset();
            let x = centerX + offset.x, y = centerY + offset.y;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }

    private onMouseMove(event: React.MouseEvent) {
        if (this.props.paintType === "Brush" && this.isPainting) {
            const nativeEvent = event.nativeEvent;
            const offSetData = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.props.paintColor);
        }

        if (this.props.paintType === "Spray") {
            this.sprayCenter = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
        }
    }

    private endPaintEvent() {
        if (this.props.paintType === "Brush") {
            if (this.isPainting) {
                this.isPainting = false;
            }
        } else if (this.props.paintType === "Spray") {
            clearInterval(this.sprayInterval);
        }
        if (this.props.onPaint) {
            this.props.onPaint(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        }
        this.storeImageData();
    }

    private storeImageData() {
        this.setState({ imageData: this.canvas.toDataURL("image/png") });

        this.line = [];
    }

    private paint(prevPos: IOffset, currPos: IOffset, strokeStyle: string) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(prevPos.offsetX, prevPos.offsetY);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(currPos.offsetX, currPos.offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = currPos;
    }

    private loadDefaultImage(event: React.SyntheticEvent<HTMLImageElement>) {
        this.ctx.drawImage(event.currentTarget, 0, 0);
        this.ctx.stroke();
        if (this.props.onDefaultImageLoaded) {
            this.props.onDefaultImageLoaded(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        }
    }

    public componentDidMount() {
        // Here we set up the properties of the canvas element. 
        this.canvas.width = this.props.width ? this.props.width : 500;
        this.canvas.height = this.props.height ? this.props.height : 400; 
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
    }

    public render() {
        const {
            id,
            ref,
            defaultImage,
            backgroundColor,
            ...props
        } = this.props;
        return (
            <div>
                <canvas id={id} ref={(ref) => this.canvas = ref}
                    style={{ background: backgroundColor ? backgroundColor : "#FFFFFF"}}
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                    {...props}
                />
                <input type="hidden" data-canvas-id={id} data-field-type='image/png' data-custom-field-type="canvas" name='My painting' value={this.state.imageData} readOnly={true}></input>
                {defaultImage ? <img id={id + "-default-image"} src={defaultImage} onLoad={this.loadDefaultImage} hidden></img> : null}
            </div>
        );
    }
}
