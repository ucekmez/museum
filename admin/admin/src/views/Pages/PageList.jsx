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
import { APIfetch, NEWPAGEPAGE, EDITPAGEPAGE, PTSPAGE, APIremovepage, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Translate from "@material-ui/icons/Translate";
import Close from "@material-ui/icons/Close";

class PageList extends React.Component {
  state = {
    pages: [],
  };

  gotoNewPagePage  = (e)  => { this.props.history.push(NEWPAGEPAGE) }
  gotoEditPagePage = (id) => { this.props.history.push(EDITPAGEPAGE + '/' + id) }
  pageTranslations = (id) => { this.props.history.push(PTSPAGE + '/' + id) }

  removePage       = (id, index) => {
    APIremovepage(this, id);
    this.setState({'pages': this.state.pages.filter((page, i) => page[0] !== id)})
   }

   fetch = (classes) => {
     APIfetch('/pages',
       (r) => {
         const pages = [];
         r.data.map((data, index) => pages.push(
           [data['id'], data['title'],
           <div>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Çeviriler"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.pageTranslations.bind(this, data['id'])}>
                         <Translate className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditPagePage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removePage.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'pages': pages})
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
              <CardIcon color="success" onClick={this.gotoNewPagePage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Sayfalar ({this.state.pages.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "İşlemler"]}
                tableData={this.state.pages}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

PageList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageList);
