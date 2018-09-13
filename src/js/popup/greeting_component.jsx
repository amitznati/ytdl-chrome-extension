import React from "react";
import { hot } from "react-hot-loader";
import ytdl from 'ytdl-core';
import VideoInfoList from './video_info_list.jsx';
import {FormGroup, Button, Label, Input} from 'reactstrap';
const validTypes = ["Audio", "Video"];
const validFormat = {
  Audio: ["mp3","m4a","aac","flac","ogg","wma"],
  Video: ["mp4","avi","wmv","3gp"]
}
class GreetingComponent extends React.Component {

  constructor(props){
    super(props);
    this.download = this.download.bind(this);
    this.urlChanged = this.urlChanged.bind(this);
    this.state = {
      inputUrl: '',
      formats: null,
      info: null,
      allRows: false
    }
  }

  urlChanged(e) {
    this.setState({inputUrl: e.target.value});
  }

  download() {
    this.setState({allRows: false})
    const {inputUrl: url}  = this.state;
    const videoID = ytdl.getURLVideoID(url);
    ytdl.getInfo(videoID, (err, info) => {
      if (err) throw err;
      console.log(info);
      this.setState({info})
      let formats = info.formats.map(format => {
        const {itag,container,type,url} = format;
        const isVideo = type.includes('video');
        const quality = isVideo ?
            `${format.quality || format.quality_label}/${format.resolution}` : '';
        const newFormat = {
          itag,
          container,
          type,
          url,
          quality
        }
        return newFormat;
      });
      this.setState({formats})
    });
  }

  render () {
    return (
        <div className="my-container">
          <h4>Download video/audio from YouTube</h4>
          <FormGroup>
            <Label for="urlinput">Link</Label>
            <Input onChange={this.urlChanged} name="url" type="text" className="form-control" placeholder="e.g. https://www.youtube.com/watch?v=RYMH3qrHFEM" id="urlinput"/>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.download} disabled={!this.state.inputUrl} className="btn btn-success form-control">Get Download Links</Button>
          </FormGroup>
          <div>
            <h5 className="video-title" >{this.state.info ? this.state.info.title : 'No Video Selected'}</h5>
          </div>
          <div>
            <VideoInfoList info={this.state.info} allRows={this.state.allRows}/>
          </div>
        </div>
    )
  }
};

export default hot(module)(GreetingComponent)
