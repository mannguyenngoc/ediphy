import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
import screenfull from 'screenfull';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MarkEditor from './../../../_editor/components/rich_plugins/mark_editor/MarkEditor';
import img from './../../../dist/images/broken_link.png';
import WaveSurfer from 'wavesurfer.js';
import ReactWavesurfer from 'react-wavesurfer';

export default class BasicAudioPluginEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 0.8,
            duration: 0,
            played: 0,
            seeking: false,
            fullscreen: false,
            controls: true,
            playing: false,
            pos: 0,
        };
        this.handleTogglePlay = this.handleTogglePlay;
        this.handlePosChange = this.handlePosChange;
    }

    handleTogglePlay() {
        this.setState({ playing: !this.state.playing });
    }

    onClickFullscreen() {
        if(!this.state.fullscreen) {
            screenfull.request(findDOMNode(this.player_wrapper)); // pq player_wrapper?
        } else {
            screenfull.exit();
        }
        this.setState({ fullscreen: !this.state.fullscreen });
    }

    setVolume(e) {
        this.setState({ volume: parseFloat(e.target.value) });
    }

    setPlaybackRate(e) {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    }

    onSeekMouseDown() {
        this.setState({ seeking: true });
    }

    onSeekChange(e) {
        this.setState({ played: (e.clientX - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width });
    }

    onSeekMouseUp(e) {
        if(e.target.className.indexOf('progress-player-input') !== -1) {
            this.setState({ seeking: false });
        }
        this.player.seekTo((e.clientX - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width);
    }

    onProgress(state) {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        }
    }

    getDuration() {
        return this.state.duration;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.state.controls === true && this.state.controls !== this.props.state.controls) {
            this.setState({ controls: true });
        } else if (nextProps.state.controls === false && this.state.controls !== this.props.state.controls) {
            this.setState({ controls: false });
        }
    }

    // necesario para solucioonar incoherencias entre API de WebAudio y MediaElement
    handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0],
        });
    }

    render() {

        let marks = this.props.state.__marks;

        let markElements = Object.keys(marks).map((id) =>{
            // aqui solo entra cuando le das a save changes que es cuando da error
            console.log("render");
            let value = marks[id].value;
            let title = marks[id].title;
            let color = marks[id].color;
            // repasar MarkEditor
            return(
                <MarkEditor onRichMarkUpdated={this.props.onRichMarkUpdated} key={id} style={{ left: value, position: "absolute" }} time={1.5} mark={id} state={this.props.state} base={this.props.base}>
                    <a key={id} href="#">
                        <div style={{ width: "4px", height: "8px", background: color || "#17CFC8" }}>
                            <OverlayTrigger key={id} text={title} placement="top" overlay={<Tooltip id={id}>{title}</Tooltip>}>
                                <i style={{ color: color || "#17CFC8", position: "relative", top: "-24px", left: "-10px" }} className="material-icons">room</i>
                            </OverlayTrigger>
                        </div>
                    </a>
                </MarkEditor>);
        });

        return (
            <div ref={player_wrapper => {this.player_wrapper = player_wrapper;}} style={{ width: "100%", height: "100%", pointerEvents: "none" }} className="basic-audio-wrapper">
                <ReactWavesurfer

                    ref={player => { this.player = player; }}
                    style={{ width: "100%", height: "100%" }}
                    height="100%"
                    width="100%"
                    fileConfig={{ attributes: { poster: img } }}
                    volume={this.state.volume}
                    onPlay={() => this.setState({ playing: true })}
                    onPause={() => this.setState({ playing: false })}
                    onEnded={() => this.setState({ playing: false })}
                    onProgress={this.onProgress.bind(this)}
                    onDuration={duration => this.setState({ duration })}

                    audioFile={this.props.state.url}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                />

                {(this.props.state.controls) && (
                    <div className="player-media-controls" style={{ pointerEvents: 'none' }}>
                        <button className="play-player-button" onClick={this.handleTogglePlay.bind(this)}>{this.state.playing ? <i className="material-icons">pause</i> : <i className="material-icons">play_arrow</i>}</button>
                        <div className="progress-player-input dropableRichZone" style={{ height: "15px", position: "relative" }}>
                            <div className="fakeProgress" />
                            <div className="mainSlider" style={{ position: "absolute", left: this.state.played * 100 + "%" }} />
                            {markElements}
                        </div>
                        <input className="volume-player-input " type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume.bind(this)} />
                        <button className="fullscreen-player-button" onClick={this.onClickFullscreen.bind(this)}>{(!this.state.fullscreen) ? <i className="material-icons">fullscreen</i> : <i className="material-icons">fullscreen_exit</i>}</button>
                    </div>
                )}
            </div>
        );

    }
}