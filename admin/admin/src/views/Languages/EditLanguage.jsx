import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { APIeditlanguage, APIfetch, LANGUAGESPAGE, styles } from "variables/helpers";

class EditLanguage extends React.Component {
  state = {
    id: "",
    title: "",
    code: ""
  };

  componentDidMount(prevProps) {
    const fetched_id = this.props.match.params.id
    APIfetch('/languages/' + fetched_id,
      (r) => {
        this.setState({'id': fetched_id})
        this.setState({'title': r.data[0].title})
        this.setState({'code': r.data[0].code})
      },
      (r) => {
        this.props.history.push(LANGUAGESPAGE)
      })
  }

  editLanguage = () => { APIeditlanguage(this) }

  handleTitleChange = (e) => { this.setState({ title: e.target.value }); }
  handleCodeChange  = (e) => { this.setState({ code: e.target.value }); }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Dil Düzenle</h4>
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
                    <CustomInput
                      onChange={this.handleCodeChange}
                      labelText="Dil Kodu"
                      id="code"
                      value={this.state.code}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button fullWidth={true} onClick={this.editLanguage} color="success">Onayla</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }

}

EditLanguage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditLanguage);
