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
import { APIfetch, NEWARTIFACTPAGE, EDITARTIFACTPAGE, EDITMEDIAPAGE, APIremoveartifact, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class ArtifactList extends React.Component {
  state = {
    artifacts: [],
  };


  gotoNewArtifactPage  = (e) => { this.props.history.push(NEWARTIFACTPAGE) }
  gotoEditArtifactPage = (id) => { this.props.history.push(EDITARTIFACTPAGE + '/' + id) }
  gotoMediaPage        = (id) => { this.props.history.push(EDITMEDIAPAGE + '/' + id) }

  removeArtifact       = (id, index) => {
    APIremoveartifact(this, id);
    this.setState({'artifacts': this.state.artifacts.filter((cat, i) => cat[0] !== id)})
   }


   fetch = (classes) => {
     APIfetch('/artifacts',
       (r) => {
         const arts = [];
         r.data.map((data, index) => arts.push(
           [data['id'], data['title'], data['description'].substring(0, 40)+' ...',
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditArtifactPage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top"
                     title="Medya Yönetimi"
                     placement="top"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Medya Yönetimi" className={classes.tableActionButton}
                                 onClick={this.gotoMediaPage.bind(this, data['id'])}>
                         <AddAPhoto className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removeArtifact.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'artifacts': arts})
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
            <CardHeader color="primary">
              <CardIcon color="success" onClick={this.gotoNewArtifactPage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Eserler ({this.state.artifacts.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Açıklama", "İşlemler"]}
                tableData={this.state.artifacts}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

ArtifactList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArtifactList);
