import React, {Component} from 'react';
import { ReactMicPlus } from 'react-mic-plus';
import { string, number, bool, func } from 'prop-types';
import { MicrophoneRecorder } from '../libs/MicrophoneRecorder';
import { Visualizer } from 'react-mic-plus/lib/libs/Visualizer';
import { AudioRecorder } from 'react-mic-plus/lib/libs/AudioRecorder';
import { AudioContext } from 'react-mic-plus/es/libs/AudioContext';

//import './ReactMic.css'

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMic = function (_Component) {
  _inherits(ReactMic, _Component);

  function ReactMic(props) {
    _classCallCheck(this, ReactMic);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.visualize = function () {
      var self = _this;
      var _this$props = _this.props,
          backgroundColor = _this$props.backgroundColor,
          strokeColor = _this$props.strokeColor,
          width = _this$props.width,
          height = _this$props.height,
          visualSetting = _this$props.visualSetting;
      var _this$state = _this.state,
          canvas = _this$state.canvas,
          canvasCtx = _this$state.canvasCtx;


      if (visualSetting === 'sinewave') {
        Visualizer.visualizeSineWave(canvasCtx, canvas, width, height, backgroundColor, strokeColor);
      } else if (visualSetting === 'frequencyBars') {
        Visualizer.visualizeFrequencyBars(canvasCtx, canvas, width, height, backgroundColor, strokeColor);
      } else if (visualSetting === 'frequencyCircles') {
        Visualizer.visualizeFrequencyCircles(canvasCtx, canvas, width, height, backgroundColor, strokeColor);
      }
    };

    _this.state = {
      microphoneRecorder: null,
      canvas: null,
      canvasCtx: null
    };
    return _this;
  }

  ReactMic.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        onSave = _props.onSave,
        onStop = _props.onStop,
        onStart = _props.onStart,
        onData = _props.onData,
        onBlock = _props.onBlock,
        onPause = _props.onPause,
        audioElem = _props.audioElem,
        audioBitsPerSecond = _props.audioBitsPerSecond,
        mimeType = _props.mimeType;
    var visualizer = this.refs.visualizer;

    var canvas = visualizer;
    var canvasCtx = canvas.getContext("2d");
    var options = {
      audioBitsPerSecond: audioBitsPerSecond,
      mimeType: mimeType
    };

    if (audioElem) {
      AudioRecorder.create(audioElem);

      this.setState({
        canvas: canvas,
        canvasCtx: canvasCtx
      }, function () {
        _this2.visualize();
      });
    } else {

      this.setState({
        microphoneRecorder: new MicrophoneRecorder(onStart, onStop, onSave, onData, onBlock, onPause, options),
        canvas: canvas,
        canvasCtx: canvasCtx
      }, function () {
        _this2.visualize();
      });
    }
  };

  ReactMic.prototype.clear = function clear() {
    var _props2 = this.props,
        width = _props2.width,
        height = _props2.height;
    var canvasCtx = this.state.canvasCtx;

    canvasCtx.clearRect(0, 0, width, height);
  };

  ReactMic.prototype.render = function render() {
    var _props3 = this.props,
        record = _props3.record,
        onStop = _props3.onStop,
        pause = _props3.pause,
        stop = _props3.stop,
        width = _props3.width,
        height = _props3.height;
        var _state = this.state,
        microphoneRecorder = _state.microphoneRecorder,
        canvasCtx = _state.canvasCtx;



    if (microphoneRecorder) {
        if (record) {
          microphoneRecorder.startRecording();
          console.log('in')
        }else if(pause) {
          microphoneRecorder.pauseRecording();
        }
        else if(stop){
            microphoneRecorder.stopRecording(onStop);
            this.clear();
        }
    }

    // if (record) {
    //   if (microphoneRecorder) {
    //     if (pause) {
    //       microphoneRecorder.pauseRecording();
    //     } else {
    //       microphoneRecorder.startRecording();
    //     }
    //   }
    // } else {
    //   if (microphoneRecorder) {
    //     microphoneRecorder.stopRecording(onStop);
    //     this.clear();
    //   }
    // }

    return React.createElement('canvas', { ref: 'visualizer', height: height, width: width, className: this.props.className });
  };

  return ReactMic;
}(Component);

export { ReactMic as default };


ReactMic.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundColor: string,
  strokeColor: string,
  className: string,
  audioBitsPerSecond: number,
  mimeType: string,
  height: number,
  record: bool.isRequired,
  onStop: func,
  onData: func
} : {};

ReactMic.defaultProps = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: '#000000',
  className: 'visualizer',
  audioBitsPerSecond: 128000,
  mimeType: 'audio/webm;codecs=opus',
  record: false,
  width: 640,
  height: 100,
  visualSetting: 'sinewave'
};

/* class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
  }
  startRecording = () => {
    this.setState({
      record: true
    });
  };
  stopRecording = () => {
    this.setState({
      record: false
    });
  };
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
  render() {
    return (
    <div>
      <ReactMicPlus record={this.state.record} className="sound-wave" onStop={this.onStop} nonstop={true} duration={5} />
      <div id="project-wrapper">
        <div id="project-container">
          <div id="overlay"></div>
          <div id="content">
            <h2>React-Mic</h2>
            <h3>Record Audio As A WebM Audio File</h3>
            <canvas height="100" width="640" class="oscilloscope"></canvas>
            <div id="oscilloscope-scrim">
              <div id="scrim"></div>
            </div>
            <div id="controls">
              <div class="column active">
                <button onTouchTap={this.startRecording} type="button"><i class="fa fa-record-vinyl fa-fw" aria-hidden="true"></i></button>
              </div>
              <div class="column">
                <button onTouchTap={this.stopRecording} type="button"><i class="fa disabled fa-stop-circle" aria-hidden="true"></i></button>
                <i class="fa disabled fa-stop-circle" aria-hidden="true"></i>
              </div>
              <div class="column download">
                <a class="fa disabled fa-download" download="recording.webm" aria-hidden="true"></a>
              </div>
            </div>
          </div>
          <div id="audio-playback-controls">
            <audio controls="" controlslist="nodownload"></audio>
          </div>
        </div>
      </div>
    </div>);
  }
} */