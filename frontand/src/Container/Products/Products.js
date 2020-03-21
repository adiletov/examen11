import React, {Component} from 'react';
import {connect} from "react-redux";
import {Row} from "reactstrap";
import Prelouder from "../../Components/Prelouder/Prelouder";
import {orderProducts} from "../../Store/Actions/actionProducts";


class Products extends Component {

    componentDidMount() {
        if (!this.props.match.params.id){
            this.props.orderProducts();
        }else{
            this.props.orderProducts(this.props.match.params.id)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.orderProducts(this.props.match.params.id);
        }
    };

    render() {
        console.log(this.props.products)
        return (
            <Row>
                {this.props.loading && <Prelouder/>}


            </Row>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products
});

const mapDispatchToProps = dispatch => ({
    orderProducts: () => dispatch(orderProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
