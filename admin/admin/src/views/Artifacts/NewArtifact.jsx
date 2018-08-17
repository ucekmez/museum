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
import { APInewartifact, styles, APIfetch } from "variables/helpers";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";



class NewArtifact extends React.Component {
  state = {
    title: "",
    category: "",
    qr_id: "",
    ibeacon_id: "",
    description: "",
    extra: "",
    tags: "",
    categories: [],
    isfeatured: false,
  };

  componentDidMount(prevProps) {
    APIfetch('/categories',
      (r) => {
        this.setState({'categories': r.data})
      },
      (r) => { console.log(r)} )
  }

  addnewArtifact = () => { APInewartifact(this); }

  handleTitleChange       = (e) => { this.setState({ title: e.target.value }); }
  handleQRIDChange        = (e) => { this.setState({ qr_id: e.target.value }); }
  handleIBEACONIDChange   = (e) => { this.setState({ ibeacon_id: e.target.value }); }
  handleTagsChange        = (e) => { this.setState({ tags: e.target.value }); }
  handleCategoryChange    = (e) => { this.setState({ category: e.target.value }); }
  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }
  handleExtraChange       = (e) => { this.setState({ extra: e.target.value }); }
  handleFeaturedChange    = (e) => { this.setState({ isfeatured: e.target.checked }); };



  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Yeni Eser</h4>
                <p className={classes.cardCategoryWhite}>Lütfen tüm alanları doldurun.</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={this.handleTitleChange}
                      labelText="Başlık"
                      id="title"
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      onChange={this.handleQRIDChange}
                      labelText="QR ID"
                      id="qr_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      onChange={this.handleIBEACONIDChange}
                      labelText="iBeacon ID"
                      id="ibeacon_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      onChange={this.handleTagsChange}
                      labelText="Anahtar Kelimeler (boşluk ile ayırın)"
                      id="tags"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem xs={12} sm={12} md={9}>
                    <div className={classes.block}>
                      <FormControlLabel
                        control={
                          <Switch
                            name="checkisfeatured"
                            value=""
                            checked={this.state.isfeatured}
                            onChange={this.handleFeaturedChange}
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              icon: classes.switchIcon,
                              iconChecked: classes.switchIconChecked,
                              bar: classes.switchBar
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Ana Sayfada Göster"
                      />
                    </div>
                  </GridItem>
                </Grid>

                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Açıklama</InputLabel>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Eser hakkında açıklama yazısı burada yer alacak."
                      id="description"
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
                      onChange={this.handleExtraChange}
                      labelText="Eser hakkında ekstra bilgiler burada yer alacak."
                      id="extra"
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
                <Button fullWidth={true} onClick={this.addnewArtifact} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

NewArtifact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewArtifact);
