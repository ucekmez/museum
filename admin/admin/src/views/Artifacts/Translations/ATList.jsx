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
import { APIfetch, NEWATPAGE, EDITATPAGE, ATSPAGE, APIremoveat, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class ATList extends React.Component {
  state = {
    artifact: "",
    title: "",
    ats: [],
  };

  gotoNewATPage  = (e)  => { this.props.history.push(NEWATPAGE + '/' + this.state.artifact) }
  gotoEditATPage = (id) => { this.props.history.push(EDITATPAGE + '/' + id) }
  removeAT       = (id, index) => {
    const ida = this.props.match.params.id;
    APIremoveat(this, id, ida);
    this.setState({'ats': this.state.ats.filter((at, i) => at[0] !== id)})
   }

   fetch = (classes) => {
     const fetched_artifact_id = this.props.match.params.id;
     this.setState({'artifact': fetched_artifact_id});

     APIfetch('/artifacts/' + fetched_artifact_id,
       (r) => {
         this.setState({'title': r.data[0].title})
       },
       (r) => {
         this.props.history.push(ATSPAGE+"/"+fetched_artifact_id)
       })

     APIfetch('/artifacttranslations/' + fetched_artifact_id,
       (r) => {
         const ats = [];
         r.data.map((data, index) => ats.push(
           [data['id'], data['title'], data['description'].substring(0, 30)+ ' ...', data['language_title'],
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditATPage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removeAT.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'ats': ats})
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
              <CardIcon color="success" onClick={this.gotoNewATPage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>"{ this.state.title }" için Eser Çevirileri ({this.state.ats.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Açıklama", "Dil", "İşlemler"]}
                tableData={this.state.ats}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

ATList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ATList);
