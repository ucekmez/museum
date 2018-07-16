import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { APInewct, APIfetch, styles } from "variables/helpers";


class NewCT extends React.Component {
  state = {
    category: "",
    base_title: "",
    base_description: "",
    languages: [],
    language: "",
    title: "",
    description: "",
  };

  componentDidMount(prevProps) {
    const fetched_category_id = this.props.match.params.id
    this.setState({'category': fetched_category_id})

    APIfetch('/languages',
      (r) => {
        this.setState({'languages': r.data}, () => {


          APIfetch('/categorytranslations/' + fetched_category_id,
            (cts) => {
              cts.data.map((ct, indexct) => {
                this.setState({'languages': this.state.languages.filter((l, i) => l.code !== ct.language_code)})
              })
            },
            (cts) => { console.log(cts)} )


        })


      },
      (r) => { console.log(r)} )

      APIfetch('/categories/' + fetched_category_id,
        (r) => {
          this.setState({'base_title': r.data[0].title})
          this.setState({'base_description': r.data[0].description})
        },
        (r) => { console.log(r)} )
  }

  addnewCT = () => { APInewct(this) }

  handleTitleChange       = (e) => { this.setState({ title: e.target.value }); }
  handleLanguageChange    = (e) => { this.setState({ language: e.target.value }); }
  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Başlık</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <div><h3>{ this.state.base_title }</h3></div>
                </Grid>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Açıklama</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <div><p>{ this.state.base_description }</p></div>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Yeni Kategori Çevirisi</h4>
                <p className={classes.cardCategoryWhite} style={{'color':'black'}}>Lütfen tüm alanları doldurun.</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}>
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}>
                        Lütfen Dil Seçin
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.language}
                        onChange={this.handleLanguageChange}
                        inputProps={{
                          name: "selectlanguage",
                          id: "language"
                        }}>

                        {this.state.languages.map(function(data, index){
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
                  <GridItem xs={12} sm={12} md={12}>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Açıklama</InputLabel>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Kategori hakkında açıklama yazısı burada yer alacak."
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
              </CardBody>
              <CardFooter>
                <Button fullWidth={true} onClick={this.addnewCT} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

NewCT.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewCT);
