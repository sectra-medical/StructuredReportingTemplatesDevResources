import * as React from "react";
import {HTMLProps} from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { IPixelData } from "../interfaces/PixelData";

interface SectraCanvasState {
    imageData: string;
    pixelData: Array<IPixelData>;
}

interface SectraCanvasProps extends HTMLProps<HTMLCanvasElement> {
    id: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    paintColor?: string;
    defaultImage?: string;
    onPixelDataChange?: (pixelData: Array<IPixelData>) => void;
}

interface IOffset {
    offsetX: number;
    offsetY: number;
}

interface ILine {
    start: IOffset;
    stop: IOffset;
}

export class SectraCanvas extends React.Component<SectraCanvasProps, SectraCanvasState> {
    private isPainting: boolean;
    private canvas: HTMLCanvasElement;
    private prevPos: IOffset;
    private line: ILine[];
    private ctx: CanvasRenderingContext2D;
    private interval: any;
    private center: any;
    private defaultImage: React.RefObject<HTMLImageElement>;
    private transPositions: Array<number> = [];
    private defaultColor: string = "#fd4545";
    private emptyPixelData = JSON.stringify({pixelsA: [0, 0, 0, 0, 0], pixelsB: [0, 0, 0, 0, 0], pixelsC: [0, 0 ,0, 0, 0], transRatio: 0});

    constructor(props: SectraCanvasProps, context: any) {
        super(props, context);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.spray = this.spray.bind(this);
        this.loadDefaultImage = this.loadDefaultImage.bind(this);
        this.clearImage = this.clearImage.bind(this);
        this.state = { imageData: '', pixelData: [
            JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData)
        ]};
        this.line = [];
        this.defaultImage = React.createRef();
    }

    private onMouseDown(event: React.MouseEvent) {
        /*
        const nativeEvent = event.nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
        */
       this.center = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
       this.interval = setInterval(this.spray, 10);
    }

    private onMouseMove(event: React.MouseEvent) {
        if (this.isPainting) {
            const nativeEvent = event.nativeEvent;
            const offSetData = { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.props.paintColor ? this.props.paintColor : this.defaultColor);
        }
        this.center = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
    }

    private endPaintEvent() {
        /*
        if (this.isPainting) {
            this.isPainting = false;
            this.storeImageData();
        }
        */
       clearInterval(this.interval);
       this.storeImageData();
       this.calculatePixelData();
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
        // Visualize the line using the strokeStyl
        this.ctx.stroke();
        this.prevPos = currPos;
    }

    private getRandomOffset() {
        let radius = 8;
        let randomAngle = Math.random() * 360;
        let randomRadius = Math.random() * radius;
        return {x: Math.cos(randomAngle) * randomRadius, y: Math.sin(randomAngle) * randomRadius}
    }

    private spray() {
        let centerX = this.center.x, centerY = this.center.y;
        let density = 2;
        this.ctx.fillStyle = this.props.paintColor ? this.props.paintColor : this.defaultColor;
        for (let i = 0; i < density; i++) {
            let offset = this.getRandomOffset();
            let x = centerX + offset.x, y = centerY + offset.y;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }

    private loadDefaultImage(event: React.SyntheticEvent<HTMLImageElement>) {
        this.ctx.drawImage(event.currentTarget, 0, 0);
        this.ctx.stroke;
        this.calculateTransitionCoordinates();
    }

    private clearImage() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.defaultImage.current, 0, 0);
        this.ctx.stroke;
        this.setState({imageData: ""});
    }

    private getX(i: number) {
        return Math.floor(i/4%this.canvas.width);
    }

    private getY(i: number) {
        return Math.floor(i/4/this.canvas.width);
    }

    private calculateAPosition(x: number, y: number, pixelsA: Array<number>) {
        if (x > 300 && x < 475 && y > 105 && y < 230) {
            if (x < 284.7486 + y/3.69231) {
                pixelsA[0] += 1;
                pixelsA[4] += y < 172 ? 1 : -1;
            } else if (x < 388) {
                pixelsA[1] += 1;
                pixelsA[4] += y < 167 ? 1 : -1;
            } else if (x > 491 - 0.27193*y) {
                pixelsA[3] += 1;
                pixelsA[4] += y < 172 ? 1 : -1;
            } else {
                pixelsA[2] += 1;
                pixelsA[4] += y < 167 ? 1 : -1;
            }
        }
    }

    private calculateBPosition(x: number, y: number, pixelsB: Array<number>) {
        if (x > 310 && x < 465 && y > 290 && y < 420) {
            if (x < 267 + 0.2039*y) {
                pixelsB[0] += 1;
                pixelsB[4] += y <= 355 ? 1 : -1;
            } else if (x < 388) {
                pixelsB[1] += 1;
                pixelsB[4] += y < 348 ? 1 : -1;
            } else if (x > 512 - 0.211*y) {
                pixelsB[3] += 1;
                pixelsB[4] += y < 355 ? 1 : -1;
            } else {
                pixelsB[2] += 1;
                pixelsB[4] += y <= 348 ? 1 : -1;
            }
        }
    }

    private calculateCPosition(x: number, y: number, pixelsC: Array<number>) {
        if (x > 325 && x < 535 && y > 485 && y < 585) {
           if (x < 266 + 0.178571*y) {
               pixelsC[0] += 1;
               pixelsC[4] += y < 638-0.3*x ? 1 : -1;
           } else if (x < 388) {
               pixelsC[1] += 1;
               pixelsC[4] += y < 528 ? 1 : -1;
           } else if (x > 520 - 0.197531*y) {
               pixelsC[3] += 1;
               pixelsC[4] += y < 528 ? 1 : -1;
           } else {
               pixelsC[2] += 1;
               pixelsC[4] += y < 401 + 0.310345*x ? 1 : -1;
           }
        }
    }

    private calculatePixelData() {
        var imgData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height).data;
        const pixelData: Array<IPixelData> = [JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData)];

        for(let i = 0; i < imgData.length; i += 4) {
            let pixelDataIndex = -1;
            if (imgData[i] > imgData[i+1] && imgData[i] > imgData[i+2]) {
                pixelDataIndex = 0;
            } else if (imgData[i+1] > imgData[i] && imgData[i+1] > imgData[i+2]) {
                pixelDataIndex = 1;
            } else if (imgData[i+2] > imgData[i] && imgData[i+2] > imgData[i+1]) {
                pixelDataIndex = 2;
            }

            if (pixelDataIndex !== -1) {
                if (this.transPositions.indexOf(i/4) === -1) {
                    pixelData[pixelDataIndex].transRatio--;
                } else {
                    pixelData[pixelDataIndex].transRatio++;
                }
                this.calculateAPosition(this.getX(i), this.getY(i), pixelData[pixelDataIndex].pixelsA);
                this.calculateBPosition(this.getX(i), this.getY(i), pixelData[pixelDataIndex].pixelsB);
                this.calculateCPosition(this.getX(i), this.getY(i), pixelData[pixelDataIndex].pixelsC);
            } 
        }
        if (this.props.onPixelDataChange) {
            this.props.onPixelDataChange(pixelData);
        }
        this.setState({pixelData: pixelData});
    }

    private calculateTransitionCoordinates() {
        var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        for (let i = 0; i < imgData.length; i += 4) {
            if (imgData[i] === 230 && imgData[i+1] === 230 && imgData[i+2] === 230) {
                this.transPositions.push(i/4);
            }
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

    private getMaxIndex(arr: Array<number>) {
        return arr.reduce((maxIndex, x, i, arr) => x > arr[maxIndex] ? i : maxIndex, 0);
    }

    public render() {
        return (
            <div>
                <canvas id={this.props.id} ref={(ref) => this.canvas = ref}
                    style={{ background: this.props.backgroundColor ? this.props.backgroundColor : "#FFFFFF"}}
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                />
                <Grid>
                    <Row>
                        <Col>
                            <button className="btn btn-danger" onClick={this.clearImage}>Clear map</button>
                        </Col>
                    </Row>
                </Grid>
                <input type="hidden" data-canvas-id={this.props.id} data-field-type='image/png' data-custom-field-type="canvas" name='My painting' value={this.state.imageData} readOnly={true}></input>
                {this.props.defaultImage ? <img id={this.props.id + "-default-image"} ref={this.defaultImage} src={this.props.defaultImage} onLoad={this.loadDefaultImage} hidden></img> : null}
            </div>
        );
    }
}