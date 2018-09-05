import React from "react";
import icon from "../../img/icon-128.png";
import { hot } from "react-hot-loader";
import ytdl from 'ytdl-core';

class GreetingComponent extends React.Component {

  constructor(props){
    super(props);
    this.download = this.download.bind(this);
    this.formatChanged = this.formatChanged.bind(this);
    this.urlChanged = this.urlChanged.bind(this);
    this.state = {
      inputUrl: '',
      selectedFormat: 'mp3',
      videoUrl: null,
      info: {}
    }
  }

  formatChanged(e) {
    this.setState({selectedFormat: e.target.value});
  }

  urlChanged(e) {
    this.setState({inputUrl: e.target.value});
  }

  download() {
    const {inputUrl: url, selectedFormat: format}  = this.state;
    const videoID = ytdl.getURLVideoID(url);
    // Example of choosing a video format.
    ytdl.getInfo(videoID, (err, info) => {
      if (err) throw err;
      console.log(info);
      this.setState({info});
      console.log(this.state.selectedFormat);
      var format = info.formats.filter(format => {return format.container === this.state.selectedFormat })[0];
      if (format) {
        console.log('Format found!', format);
        this.setState({videoUrl: format.url});
        
      }
    });
  }

  render () {
    return (
      <div className="container">
        <h4>Download video/audio from YouTube</h4>
        <div className="form-group">
          <label for="urlinput">Link</label>
          <input onChange={this.urlChanged} name="url" type="text" className="form-control" placeholder="e.g. https://www.youtube.com/watch?v=RYMH3qrHFEM" id="urlinput"/>
        </div>
        <div className="form-group">
          <label htmlFor="select_main">Format</label>
          <select onChange={this.formatChanged} id="select_main" name="format" className="form-control">
              <optgroup label="Audio">
                <option value="mp3">mp3</option>
                <option value="m4a">m4a</option>
                <option value="aac">aac</option>
                <option value="flac">flac</option>
                <option value="ogg">ogg</option>
                <option value="wma">wma</option>
              </optgroup>
              <optgroup label="Video">
                <option value="mp4">mp4</option>
                <option value="avi">avi</option>
                <option value="wmv">wmv</option>
                <option value="3gp">3gp</option>
              </optgroup>
          </select>
        </div>
        <div className="form-group">
          <button onClick={this.download} disabled={!this.state.inputUrl} className="btn btn-success form-control">Convert</button>
        </div>
        <div>
          {this.state.videoUrl && <a href={this.state.videoUrl} download="jhgg.m4a" >Download {this.state.info.title}</a>}
        </div>
      </div>
    )
  }
};

export default hot(module)(GreetingComponent)
