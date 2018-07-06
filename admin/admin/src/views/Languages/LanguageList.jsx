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
import { APIfetch, NEWLANGUAGEPAGE, EDITLANGUAGEPAGE, APIremovelanguage, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class LanguageList extends React.Component {
  state = {
    languages: [],
  };

  gotoNewLanguagePage  = (e)  => { this.props.history.push(NEWLANGUAGEPAGE) }
  gotoEditLanguagePage = (id) => { this.props.history.push(EDITLANGUAGEPAGE + '/' + id) }
  removeLanguage       = (id, index) => {
    APIremovelanguage(this, id);
    this.setState({'languages': this.state.languages.filter((lang, i) => lang[0] !== id)})
   }

   fetch = (classes) => {
     APIfetch('/languages',
       (r) => {
         const langs = [];
         r.data.map((data, index) => langs.push(
           [data['id'], data['title'], data['code'],
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditLanguagePage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removeLanguage.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'languages': langs})
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
              <CardIcon color="success" onClick={this.gotoNewLanguagePage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>Diller ({this.state.languages.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Dil Kodu", "İşlemler"]}
                tableData={this.state.languages}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

LanguageList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LanguageList);
