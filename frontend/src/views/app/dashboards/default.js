import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import { Row } from "reactstrap";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import RecentOrders from "../../../containers/dashboards/RecentOrders";
import Calendar from "../../../containers/dashboards/Calendar";
import BestSellers from "../../../containers/dashboards/BestSellers";
import SalesChartCard from "../../../containers/dashboards/SalesChartCard";

class DefaultDashboard extends Component {
  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.default" match={this.props.match}/>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <IconCardsCarousel/>
            <Row>
              <Colxx md="12" className="mb-4">
                <SalesChartCard/>
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="12" xl="6" className="mb-4">
            <RecentOrders/>
          </Colxx>
        </Row>

        <Row>
          <Colxx xl="6" lg="12" className="mb-4">
            <Calendar/>
          </Colxx>
          <Colxx xl="6" lg="12" className="mb-4">
            <BestSellers/>
          </Colxx>
        </Row>

       
      </Fragment>
    );
  }
}
export default injectIntl(DefaultDashboard);