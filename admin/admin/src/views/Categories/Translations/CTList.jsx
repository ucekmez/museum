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
import { APIfetch, NEWCTPAGE, EDITCTPAGE, CTSPAGE, APIremovect, styles } from "variables/helpers";
import PlusOne from "@material-ui/icons/PlusOne";
import CardIcon from "components/Card/CardIcon.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

class CategoryList extends React.Component {
  state = {
    category: "",
    title: "",
    cts: [],
  };

  gotoNewCTPage  = (e)  => { this.props.history.push(NEWCTPAGE + '/' + this.state.category) }
  gotoEditCTPage = (id) => { this.props.history.push(EDITCTPAGE + '/' + id) }
  removeCT       = (id, index) => {
    const idc = this.props.match.params.id;
    APIremovect(this, id, idc);
    this.setState({'cts': this.state.cts.filter((ct, i) => ct[0] !== id)})
   }

   fetch = (classes) => {
     const fetched_category_id = this.props.match.params.id;
     this.setState({'category': fetched_category_id});

     APIfetch('/categories/' + fetched_category_id,
       (r) => {
         this.setState({'title': r.data[0].title})
       },
       (r) => {
         this.props.history.push(CTSPAGE+"/"+fetched_category_id)
       })

     APIfetch('/categorytranslations/' + fetched_category_id,
       (r) => {
         const cts = [];
         r.data.map((data, index) => cts.push(
           [data['id'], data['title'], data['description'].substring(0, 30)+ ' ...', data['language_title'],
           <div>
                 <Tooltip
                     id="tooltip-top"
                     title="Düzenle"
                     placement="left"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Düzenle" className={classes.tableActionButton}
                                 onClick={this.gotoEditCTPage.bind(this, data['id'])}>
                         <Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>
                     </IconButton>
                 </Tooltip>
                 <Tooltip
                     id="tooltip-top-start"
                     title="Sil"
                     placement="right"
                     classes={{tooltip:classes.tooltip}}>
                     <IconButton aria-label="Sil" className={classes.tableActionButton}
                                 onClick={this.removeCT.bind(this, data['id'], index)}>
                         <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                     </IconButton>
                 </Tooltip>
             </div>
         ]) )
         this.setState({'cts': cts})
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
              <CardIcon color="success" onClick={this.gotoNewCTPage} style={{'cursor': 'pointer'}}>
                <PlusOne />
              </CardIcon>
              <h4 className={classes.cardTitleWhite} style={{'color':'black'}}>"{ this.state.title }" için Kategori Çevirileri ({this.state.cts.length})</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Başlık", "Açıklama", "Dil", "İşlemler"]}
                tableData={this.state.cts}
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
