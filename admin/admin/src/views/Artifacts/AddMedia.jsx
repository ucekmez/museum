import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { APIfetch, ARTIFACTSPAGE, APIURL, LANGS, styles, APIremovemedia } from "variables/helpers";
import defaultImage from "assets/img/image_placeholder.jpg";
import Dropzone from 'react-dropzone';
import axios from 'axios';

import Close from "@material-ui/icons/Close";
import Table from "components/Table/Table.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";


class AddMedia extends React.Component {
  state = {
    id: "",
    title: "",
    type: "",
    description: "",
    media: "",
    thumbnail: "",
    resized: "",
    lang: "",
    allmedia: [],
    yuklebutton: "YÜKLE",
    yukledisabled: false,
  };

  componentDidMount(prevProps) {
    this.setState({'thumbnail': defaultImage})
    const fetched_id = this.props.match.params.id
    APIfetch('/artifacts/' + fetched_id,
      (r) => {
        this.setState({'id': fetched_id})
        this.setState({'title': r.data[0].title})
      },
      (r) => {
        this.props.history.push(ARTIFACTSPAGE)
      })

    APIfetch('/artifacts/'+fetched_id+'/media',
      (r) => {
        const allmedia = [];
        r.data.map((data, index) => allmedia.push(
          [data['id'], data['mediatype'], data['language'], data['description']]
        ))
        this.setState({'allmedia': allmedia})
      },
      (r) => {console.log(r)})
  }


  handleTypeChange        = (e) => { this.setState({ type: e.target.value }); }
  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }
  handleLangChange        = (e) => { this.setState({ lang: e.target.value }); }
  removeMedia             = (id, index) => {
    APIremovemedia(this, id);
    this.setState({'allmedia': this.state.allmedia.filter((med, i) => med[0] !== id)})
   }

  addMedia = () => {
    this.setState({'yuklebutton': "LÜTFEN BEKLEYİN..."})
    this.setState({'yukledisabled': true})
    const url = APIURL+"/media/create";

    let data = {
      "media": this.state.media,
      "language": this.state.lang,
      "mediatype": this.state.type,
      "description": this.state.description,
      "artifact": this.state.id
    }

    let config = {}
    const _this = this;
    axios.post(url, {"data": data}, config)
      .then(function(response){
        const data = response.data
        _this.setState(prevState => ({
          allmedia: [...prevState.allmedia, [data['id'], data['mediatype'], data['language'], data['description']]],
          yuklebutton: "YÜKLE",
          yukledisabled: false
        }))
      })
  }

  render() {
    const { classes } = this.props;
    let dropzoneRef;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black', 'fontSize': '2.2em'}}>{this.state.title}</h4>
                <p className={classes.cardCategoryWhite} style={{'color':'black', 'fontSize': '0.8em'}}>{this.state.id}</p>
              </CardHeader>
              <CardBody>
                <GridItem xs={12}>
                  <Card>
                    <CardBody>


                      <Table
                        tableData={this.state.allmedia.map((data, index) => {
                          return [
                            <div className={classes.imgContainer}>
                              <img src={APIURL+"/thumbshow/"+data[0]} alt="..." className={classes.img} style={{'width':'50px'}} />
                            </div>,
                            <span>
                              <a className={classes.tdNameAnchor}>
                                {data[1]}
                              </a>
                              <br />
                              <small className={classes.tdNameSmall}>
                                {data[2]}
                              </small>
                            </span>,
                            <span>
                              <small className={classes.tdNameSmall}>
                                {data[3].substring(0, 30)+' ...'}
                              </small>
                            </span>,
                            <div>
                              <Tooltip
                                id="tooltip-top-start"
                                title="Sil"
                                placement="right"
                                classes={{tooltip:classes.tooltip}}>
                                <IconButton aria-label="Sil" className={classes.tableActionButton}
                                            onClick={this.removeMedia.bind(this, data[0], index)}>
                                  <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                                </IconButton>
                              </Tooltip>
                            </div>]
                        })}

                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Medya Yükle</h4>
                <p className={classes.cardCategoryWhite} style={{'color':'black'}}>Lütfen bir fotoğraf seçin.</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                      <Dropzone style={{'width': '100%', 'minHeight': '200px', }}
                                accept="image/jpeg, image/png,  video/mp4, audio/wav"
                                ref={(node) => { dropzoneRef = node; }}
                                onDrop={(accepted, rejected) => {
                                  accepted.forEach(file => {
                                    this.setState({'thumbnail': file.preview})
                                    //console.log(file)
                                    const _this = this;
                                    const reader = new FileReader();
                                    reader.onload = function(event) {
                                      _this.setState((prevState) => {
                                        return {media: event.target.result};
                                      });
                                    };
                                    reader.readAsDataURL(file)
                                  })
                                }}>
                          <img id="mediaimage" src={this.state.thumbnail} style={{'width': '100%'}} alt=""/>
                      </Dropzone>
                      <Button fullWidth={true} onClick={() => { dropzoneRef.open() }} color="success">Medya Seç</Button>


                  </GridItem>
                </Grid>
                <Grid container>

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select" className={classes.selectLabel}>
                        Medya Tipi Seçin
                      </InputLabel>
                      <Select
                        MenuProps={{ className: classes.selectMenu }}
                        classes={{ select: classes.select }}
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                        inputProps={{ name: "selecttype", id: "type" }}>
                        <MenuItem key="image"
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="image">
                          Fotoğraf
                        </MenuItem>
                        <MenuItem key="video"
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="video">
                          Video
                        </MenuItem>
                        <MenuItem key="voice"
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="voice">
                          Ses
                        </MenuItem>

                      </Select>
                    </FormControl>

                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select" className={classes.selectLabel}>
                        Dil Seçin
                      </InputLabel>
                      <Select
                        MenuProps={{ className: classes.selectMenu }}
                        classes={{ select: classes.select }}
                        value={this.state.lang}
                        onChange={this.handleLangChange}
                        inputProps={{ name: "selectlang", id: "lang" }}>

                        {LANGS.map(function(data, index){
                          return <MenuItem
                            key={data.code}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.code}>
                            {data.lang}
                          </MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>


                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Medya detay yazısı"
                      id="description"
                      value={this.state.description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 2
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button disabled={(this.state.yukledisabled)? "disabled" : ""} id="yukle_button" fullWidth={true} onClick={this.addMedia} color="success">{this.state.yuklebutton}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

AddMedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddMedia);
