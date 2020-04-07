import * as React from "react";
import { Col, Grid, Row, Collapse } from "react-bootstrap";
import { SectraCanvas } from "@sectra/srt-components";
import { SectraRow, SectraButtonGroup } from "@sectra/srt-components";
import { IPixelData } from "../interfaces/PixelData";
import * as images from "../images";


interface SectorMapProps {
    nrLesions: number;
    onPixelDataChange: (pixelData: Array<IPixelData>) => void;
}

interface SectorMapState {
    mapOpen: boolean;
    selectedLesion: string;
    pixelData: Array<IPixelData>;
}

export class SectorMap extends React.Component<SectorMapProps, SectorMapState> {
    private canvasWidth = 520;
    private canvasHeight = 605;
    private transPositions: Array<number> = [];
    private emptyPixelData = JSON.stringify({pixelsA: [0, 0, 0, 0, 0], pixelsB: [0, 0, 0, 0, 0], pixelsC: [0, 0 ,0, 0, 0], transRatio: 0});

    constructor(props: any) {
        super(props);
        this.collapseMap = this.collapseMap.bind(this);
        this.onPaint = this.onPaint.bind(this);
        this.calculateAPosition = this.calculateAPosition.bind(this);
        this.calculateBPosition = this.calculateBPosition.bind(this);
        this.calculateCPosition = this.calculateCPosition.bind(this);
        this.calculateTransitionCoordinates = this.calculateTransitionCoordinates.bind(this);
        this.state = { mapOpen: false, selectedLesion: "1", pixelData: [
            JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData), JSON.parse(this.emptyPixelData)
        ]};
    }

	collapseMap() {
		this.setState(state => {
			return {mapOpen: !state.mapOpen};
		});
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

    private getX(i: number) {
        return Math.floor(i/4%this.canvasWidth);
    }

    private getY(i: number) {
        return Math.floor(i/4/this.canvasWidth);
    }
    
    onPaint(imageData: ImageData) {
        const imgData = imageData.data;
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
        this.setState({pixelData: pixelData})
    }

    calculateTransitionCoordinates(imageData: ImageData) {
        var imgData = imageData.data;
        for (let i = 0; i < imgData.length; i += 4) {
            if (imgData[i] === 230 && imgData[i+1] === 230 && imgData[i+2] === 230) {
                this.transPositions.push(i/4);
            }
        }
    }

    render() {
        const paintColors: Array<string> = ["#fd4545", "#08e057", "#0822e0"];
        const lesions: Array<string> = [];
        for (let i = 0; i < this.props.nrLesions; i++) {
            lesions.push("" + (i+1));
        }
        return (
            <div>
                <Grid>
                    <Row className="show-grid form-row">
                        <Col xs={12}>
                            <button className="btn btn-link chevron" onClick={this.collapseMap}>Sector map <img src={this.state.mapOpen ? images.chevronOpen : images.chevronClosed}></img></button>

                            <Collapse in={this.state.mapOpen}>
                                <div>
                                    <SectraCanvas id="sector-map" width={this.canvasWidth} height={this.canvasHeight}
                                        paintColor={paintColors[(parseInt(this.state.selectedLesion)-1)%3]}
                                        paintType="Spray" defaultImage={images.prostateImage} onPaint={this.onPaint}
                                        onDefaultImageLoaded={this.calculateTransitionCoordinates} />
                                    <SectraRow labelFor="fetus-selector" labelText="Lesion id">
                                        <SectraButtonGroup id="fetus-selector" buttonValues={lesions} name="Lesion selector" checkedButton="1" onStateChange={(val: string) => this.setState({selectedLesion: val})}></SectraButtonGroup>
                                    </SectraRow>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}