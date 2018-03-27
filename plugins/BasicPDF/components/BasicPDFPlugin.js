import React from 'react';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';

const pdflib = require('pdfjs-dist');
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');

const pdfjsWorkerBlob = new Blob([pdfjsWorker]);
const pdfjsWorkerBlobURL = URL.createObjectURL(pdfjsWorkerBlob);
pdflib.PDFJS.workerSrc = pdfjsWorkerBlobURL;
import { setOptions, Document, Page } from 'react-pdf';
setOptions({
    workerSrc: pdflib.PDFJS.workerSrc,
});

// el visor no tiene estado como tal, solo reproduce el estado
export default class BasicAudioPlugin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //  fullscreen: false,
            numPages: null,
            pageNumber: 1,
        };
        this.onDocumentLoad = ({ numPages }) => {
            this.setState({ numPages });
        };
        this.buttonBack = this.buttonBack.bind(this);
        this.buttonNext = this.buttonNext.bind(this);
    }

    buttonNext() {
        console.log(this.state.numPages);
        if(this.state.pageNumber === this.state.numPages) {
        }
        else{
            this.setState({
                pageNumber: this.state.pageNumber + 1,
            });
        }
    }
    buttonBack() {
        if(this.state.pageNumber === 1) {
        }
        else{
            this.setState({
                pageNumber: this.state.pageNumber - 1,
            });
        }
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <button>
                    {this.state.pageNumber} of of {this.state.numPages}
                </button>
                <button onClick={this.buttonNext}>
                    Next
                </button>
                <button onClick={this.buttonBack}>
                    Back
                </button>
                <Document style={{ width: "100%", height: "100%" }}
                    file = {this.props.state.url}
                    onLoadSuccess={this.onDocumentLoad}>
                    <Page style={{ width: "100%", height: "100%" }}
                        pageNumber={this.state.pageNumber}
                    />
                </Document>
            </div>
        );
    }
}
