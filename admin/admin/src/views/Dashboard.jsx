import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import PlusOne from "@material-ui/icons/PlusOne";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { APIfetch, NEWCATEGORYPAGE, NEWARTIFACTPAGE } from "variables/helpers";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    numberOfCategories: 0,
    numberOfArtifacts: 0,
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount(prevProps) {
    APIfetch('/categories',
      (r) => { this.setState({'numberOfCategories': r.data.length})},
      (r) => {console.log(r)})

    APIfetch('/artifacts',
      (r) => { this.setState({'numberOfArtifacts': r.data.length})},
      (r) => {console.log(r)})
  }

  gotoNewCategoryPage = (e) => { this.props.history.push(NEWCATEGORYPAGE) }
  gotoNewArtifactPage = (e) => { this.props.history.push(NEWARTIFACTPAGE) }

  render() {

    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success" onClick={this.gotoNewCategoryPage} style={{'cursor': 'pointer'}}>
                  <PlusOne />
                </CardIcon>
                <p className={classes.cardCategory}>Toplam </p>
                <h3 className={classes.cardTitle}>{ this.state.numberOfCategories} Kategori</h3>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success" onClick={this.gotoNewArtifactPage} style={{'cursor': 'pointer'}}>
                  <PlusOne />
                </CardIcon>
                <p className={classes.cardCategory}>Toplam</p>
                <h3 className={classes.cardTitle}>{ this.state.numberOfArtifacts} Eser</h3>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <PlusOne />
                </CardIcon>
                <p className={classes.cardCategory}>Yeni</p>
                <h3 className={classes.cardTitle}>Sayfa</h3>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
        </Grid>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
