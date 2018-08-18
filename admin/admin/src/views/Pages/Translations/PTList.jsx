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
import { APIfetch, NEWPTPAGE, EDITPTPAGE, PTSPAGE, APIremovept, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class PTList extends React.Component {
  state = {
    page: "",
    title: "",
    pts: [],
  };

  gotoNewPTPage  = (e)  => { this.props.history.push(NEWPTPAGE + '/' + this.state.page) }
  gotoEditPTPage = (id) => { this.props.history.push(EDITPTPAGE + '/' + id) }
  removePT       = (id, index) => {
    const idc = this.props.match.params.id;
    APIremovept(this, id, idc);
    this.setState({'pts': this.state.pts.filter((pt, i) => pt[0] !== id)})
   }

   fetch = (classes) => {
     const fetched_page_id = this.props.match.params.id;
     this.setState({'page': fetched_page_id});

     APIfetch('/pages/' + fetched_page_id,
       (r) => {
         this.setState({'title': r.data[0].title})
       },
       (r) => {
         this.props.history.push(PTSPAGE+"/"+fetched_page_id)
       })

     APIfetch('/pagetranslations/' + fetched_page_id,
       (r) => {
         const pts = [];
         r.data.map((data, index) => pts.push(
           [data['id'], data['title'], data['language_title'],
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditPTPage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removePT.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'pts': pts})
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
              <CardIcon color="success" onClick={this.gotoNewPTPage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>"{ this.state.title }" için Sayfa Çevirileri ({this.state.pts.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Dil", "İşlemler"]}
                tableData={this.state.pts}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }


}

PTList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PTList);
