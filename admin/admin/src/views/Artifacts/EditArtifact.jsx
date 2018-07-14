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
import { APIeditartifact, APIfetch, ARTIFACTSPAGE, styles } from "variables/helpers";


class EditArtifact extends React.Component {
  state = {
    id: "",
    title: "",
    qr_id: "",
    ibeacon_id: "",
    description: "",
    extra: "",
    tags: "",
    category: "",
    categories: [],
  };

  componentDidMount(prevProps) {
    APIfetch('/categories',
      (r) => {
        this.setState({'categories': r.data})
      },
      (r) => { console.log(r)} )

    const fetched_id = this.props.match.params.id
    APIfetch('/artifacts/' + fetched_id,
      (r) => {
        this.setState({'id': fetched_id})
        this.setState({'title': r.data[0].title})
        this.setState({'qr_id': r.data[0].qr_id})
        this.setState({'tags': r.data[0].tags.join(" ")})
        this.setState({'ibeacon_id': r.data[0].ibeacon_id})
        this.setState({'description': r.data[0].description})
        this.setState({'extra': r.data[0].extra})
        this.setState({'category': r.data[0].category})
        console.log(r.data[0].tags)
      },
      (r) => {
        this.props.history.push(ARTIFACTSPAGE)
      })
  }

  editArtifact = () => { APIeditartifact(this);  }

  handleTitleChange       = (e) => { this.setState({ title: e.target.value }); }
  handleQRIDChange        = (e) => { this.setState({ qr_id: e.target.value }); }
  handleTagsChange        = (e) => { this.setState({ tags: e.target.value }); }
  handleIbeaconIDChange   = (e) => { this.setState({ ibeacon_id: e.target.value }); }
  handleCategoryChange    = (e) => { this.setState({ category: e.target.value }); }
  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }
  handleExtraChange       = (e) => { this.setState({ extra: e.target.value }); }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Eser Düzenle</h4>
                <p className={classes.cardCategoryWhite} style={{'color':'black'}}>Lütfen tüm alanları doldurun.</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={this.handleTitleChange}
                      labelText="Başlık"
                      id="title"
                      value={this.state.title}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}>
                        Lütfen Kategori Seçin
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.category}
                        onChange={this.handleCategoryChange}
                        inputProps={{
                          name: "selectcategory",
                          id: "category"
                        }}>

                        {this.state.categories.map(function(data, index){
                          return <MenuItem
                            key={data.id}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={data.id}>
                            {data.title}
                          </MenuItem>
                        })}


                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={this.handleQRIDChange}
                      labelText="QR ID"
                      id="qr_id"
                      value={this.state.qr_id}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={this.handleIbeaconIDChange}
                      labelText="iBeacon ID"
                      id="ibeacon_id"
                      value={this.state.ibeacon_id}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={this.handleTagsChange}
                      labelText="Anahtar Kelimeler (boşluk ile ayırın)"
                      id="tags"
                      value={this.state.tags}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Açıklama</InputLabel>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Eser hakkında açıklama yazısı burada yer alacak."
                      id="description"
                      value={this.state.description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Ekstra</InputLabel>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Eser hakkında ekstra bilgiler burada yer alacak."
                      id="extra"
                      value={this.state.extra}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button fullWidth={true} onClick={this.editArtifact} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

EditArtifact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditArtifact);
