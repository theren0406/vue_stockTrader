import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axiosURL';
import Loading from '../components/Loading';
import withErrorHandler from '../hoc/withErrorHandler';
import { getOrderList, deleteOrder } from '../actions/order';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    this.props.getOrderList();

    // axios.get('/orders.json')
    //   .then(res => {
    //     const fetchedOrders = [];
    //     // console.log(res);
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         id: key,
    //         ...res.data[key]
    //       });
    //     }
    //     // 使用reverse 將最新訂單放最上面
    //     this.setState({ loading: false, orders: fetchedOrders.reverse() });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  }

  handleDeleteOrder(orderId) {
    this.props.deleteOrder({ id: orderId });

    // const { orders } = this.state;
    // const editedOrders = orders.filter(order => order.id !== orderId);    

    // axios.delete(`/orders/${orderId}.json`)
    //   .then(res => {
    //     if (res) {
    //       alert('已刪除一筆購買紀錄');
    //       this.setState({ loading: false, orders: editedOrders });
    //     }
    //   })
    //   .catch(err => {
    //     alert('刪除失敗');
    //     this.setState({ loading: false });
    //   });
  }

  orderList() {
    const { orders } = this.props;
    return (
      orders.map((order) => (
        <div key={order.id} className="orderItem">
          <button className="close orderClose" onClick={() => this.handleDeleteOrder(order.id)}>
            <span>&times;</span>
          </button>
          <p>訂單編號 : <span>{order.id}</span><span className="orderTime">{order.time}</span></p>
          <p>內容 :
          {order.ingredients.map((ingred) => (
            ingred.amount > 0 &&
            <span key={ingred.id}>
              {ingred.name}({ingred.amount})
            </span>
            ))}
          </p>
          <p>總金額 : <span className="orderPrice">{order.totalPrice}</span> NTD</p>
        </div>
      ))
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="col-12">
        {loading ?
          <Loading /> :
          this.orderList()
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { orders, isLoading } = state.order;
  return {
      orders: orders,
      loading: isLoading
  };
}

const mapDispatchToProps = { 
  getOrderList: getOrderList, 
  deleteOrder: deleteOrder
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);