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
import { APIeditcategory, APIfetch, CATEGORIESPAGE, styles } from "variables/helpers";

class EditCategory extends React.Component {
  state = {
    id: "",
    title: "",
    description: ""
  };

  componentDidMount(prevProps) {
    const fetched_id = this.props.match.params.id
    APIfetch('/categories/' + fetched_id,
      (r) => {
        this.setState({'id': fetched_id})
        this.setState({'title': r.data[0].title})
        this.setState({'description': r.data[0].description})
      },
      (r) => {
        this.props.history.push(CATEGORIESPAGE)
      })
  }

  editCategory = () => { APIeditcategory(this) }

  handleTitleChange = (e) => { this.setState({ title: e.target.value }); }
  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Kategori Düzenle</h4>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Açıklama</InputLabel>
                    <CustomInput
                      onChange={this.handleDescriptionChange}
                      labelText="Kategori hakkında açıklama yazısı burada yer alacak."
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
              </CardBody>
              <CardFooter>
                <Button fullWidth={true} onClick={this.editCategory} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

EditCategory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCategory);
