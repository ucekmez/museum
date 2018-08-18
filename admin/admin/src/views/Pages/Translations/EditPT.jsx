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
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { APIeditpt, APIfetch, PAGESPAGE, styles } from "variables/helpers";

class EditPT extends React.Component {
  state = {
    id: "",
    page: "",
    language_code: "",
    language_title: "",
    title: "",
    content: "",
    languages: [],
    language: "",
    base_title: "",
    base_content: "",

  };

  componentDidMount(prevProps) {
    const fetched_id = this.props.match.params.id
    APIfetch('/pagetranslation/' + fetched_id,
      (r) => {
        this.setState({'id': fetched_id})
        this.setState({'language_code': r.data[0].language_code})
        this.setState({'language_title': r.data[0].language_title})
        this.setState({'title': r.data[0].title})
        this.setState({'content': r.data[0].content})
        this.setState({'page': r.data[0].page})



        APIfetch('/languages',
          (r) => {
            this.setState({'languages': r.data}, () => {
              APIfetch('/pagetranslations/' + this.state.page,
                (pts) => {
                  pts.data.map((pt, indexct) => {
                    if (pt.language_code !== this.state.language_code) {
                      this.setState({'languages': this.state.languages.filter((l, i) => l.code !== pt.language_code)})
                    }else {
                      this.state.languages.map((l, i) => {
                        if (l.code === this.state.language_code) {
                          this.setState({ language: l.id})
                        }
                      })
                    }



                  })

                },
                (pts) => { console.log(pts)} )
            })


          },
          (r) => { console.log(r)} )

      },
      (r) => {
        this.props.history.push(PAGESPAGE)
      })
      APIfetch('/pages/' + this.state.page,
        (r) => {
          this.setState({'base_title': r.data[0].title})
          this.setState({'base_content': r.data[0].content})
        },
        (r) => { console.log(r)} )

  }

  editPT = () => { APIeditpt(this) }

  handleTitleChange       = (e) => { this.setState({ title: e.target.value }); }
  handleLanguageChange    = (e) => { this.setState({ language: e.target.value }); }
  handleContentChange     = (e) => { this.setState({ content: e.target.value }); }


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
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>İçerik</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <div><p>{ this.state.base_content }</p></div>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Sayfa Çevirisi Düzenle</h4>
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
                      value={this.state.title}
                      id="title"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>İçerik</InputLabel>
                    <CustomInput
                      onChange={this.handleContentChange}
                      labelText="Sayfa içeriği burada yer alacak."
                      id="content"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.content}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button fullWidth={true} onClick={this.editPT} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

EditPT.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPT);
