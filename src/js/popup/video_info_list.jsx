import React from "react";
import { hot } from "react-hot-loader";
import plus from './../../img/plus.svg';

import {Table, Collapse} from 'reactstrap';

class VideoInfoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        allSize: [],
        allRows: props.allRows,
        audioCollapse: true,
        videoCollapse: true
    }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.info) {
        console.log(nextProps);
        nextProps.info.formats.forEach(format => {
            this.setFileSize(format);
        });
        this.setState({allRows: true});
      }
  }

  getFileSize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
                                 //  to get only the header
    xhr.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(parseInt(xhr.getResponseHeader("Content-Length")));
        }
    };
    xhr.send();
}

formatSizeUnits(bytes){
    if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
    else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
    else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
    else if (bytes>1)           {bytes=bytes+' bytes';}
    else if (bytes==1)          {bytes=bytes+' byte';}
    else                        {bytes='0 byte';}
    return bytes;
}

setFileSize(format) {
    const {itag, url} = format;
    this.getFileSize(url,size => {
        var {allSize} = this.state;
        allSize[itag] = this.formatSizeUnits(size);
        this.setState({allSize});
    });
}

renderRow(itag,container,quality,type,size,url){
    return (
        <tr key={itag}>
            <th scope="row">{container}</th>
            <td>{quality}</td>
            <td>{type}</td>
            <td>{size}</td>
            <td><a download href={url}>Downalod</a></td>
        </tr>
    )
}

getAllRows(props) {
    let videos = [
        
    ];
    let audios = [
        
    ];
    
    props.info && props.info.formats.map(format => {
        const {itag,container,type,url} = format;
        const isVideo = type.includes('video');
        const quality = isVideo ?
            `${format.quality || format.quality_label}/${format.resolution}` : '';
        const size = this.state.allSize[format.itag];
        if(isVideo) 
            videos.push(
                this.renderRow(itag,container,quality,type,size,url)
            )
        else audios.push(
            this.renderRow(itag,container,quality,type,size,url)
        )
        return format;
    });

    const videoSep = (
        <tbody key="videoSepBody">
            <tr key="videoSep" onClick={()=>{this.setState({videoCollapse: !this.state.videoCollapse})}}>
                <td><img src={plus} /></td>
                <th scope="row" colSpan={3}>Videos</th>
            </tr>
        </tbody>
    )
    const audioSep = (
        <tbody key="audioSepBody">
            <tr key="audioSep" onClick={()=>{this.setState({audioCollapse: !this.state.audioCollapse})}}>
                <td><img src={plus} /></td>
                <th scope="row" colSpan={3}>Audios</th>
            </tr>
        </tbody>
    )
    const allAudios = (
        <tbody key="allAudios" className={this.state.audioCollapse ? "collapse" : ""}>
            {audios}
        </tbody>
        
        
    )
    const allVideos = (
        <tbody key="allVideos" className={this.state.videoCollapse ? "collapse" : ""}>
            {videos}
        </tbody>
    )
    return [videoSep,allVideos,audioSep,allAudios];
}

  render () {
    return (
        <Table>
            <thead>
                <tr>
                    <th scope="col">File ext.</th>
                    <th scope="col">Quality/Resolution</th>
                    <th scope="col">Type</th>
                    <th scope="col">Size</th>
                    <th scope="col">Download</th>
                </tr>
            </thead>
                {this.state.allRows && this.getAllRows(this.props)}
        </Table>
    )
  }
};

export default hot(module)(VideoInfoList)
