import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { APIfetch, NEWCATEGORYPAGE, EDITCATEGORYPAGE, APIremovecategory, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class CategoryList extends React.Component {
  state = {
    categories: [],
  };

  gotoNewCategoryPage  = (e)  => { this.props.history.push(NEWCATEGORYPAGE) }
  gotoEditCategoryPage = (id) => { this.props.history.push(EDITCATEGORYPAGE + '/' + id) }
  removeCategory       = (id, index) => {
    APIremovecategory(this, id);
    this.setState({'categories': this.state.categories.filter((cat, i) => cat[0] !== id)})
   }

   fetch = (classes) => {
     APIfetch('/categories',
       (r) => {
         const cats = [];
         r.data.map((data, index) => cats.push(
           [data['id'], data['title'], data['description'],
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditCategoryPage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removeCategory.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'categories': cats})
       },
       (r) => {console.log(r)})
   }

  componentDidMount(prevProps) {
    const { classes } = this.props;
    this.fetch(classes);

  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <CardIcon color="success" onClick={this.gotoNewCategoryPage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Kategoriler ({this.state.categories.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Açıklama", "İşlemler"]}
                tableData={this.state.categories}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryList);
