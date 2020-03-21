import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardImg, CardText, CardTitle, Col, NavLink, Row} from "reactstrap";
import Prelouder from "../../Components/Prelouder/Prelouder";
import {orderProducts} from "../../Store/Actions/actionProducts";
import {apiURL} from "../../apiURL";
import {NavLink as RouterNavLink} from 'react-router-dom';
import Categories from "../Categories/Categories";


class Products extends Component {

    componentDidMount() {
        if (!this.props.match.params.id) {
            this.props.orderProducts()
        } else {
            this.props.orderProducts(this.props.match.params.id)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.orderProducts(this.props.match.params.id);
        }
    };

    render() {
        return (
            <>
                <Categories/>
                <Row>
                    {this.props.loading && <Prelouder/>}
                    {this.props.products.map(product =>

                        <Col xs="12" sm="6" md="4" key={product._id}>
                            <Card className="mb-3">
                                {product.image
                                    ? <NavLink
                                        tag={RouterNavLink}
                                        to={`/product/${product._id}`}>
                                        <CardImg top width="100%" src={`${apiURL}/uploads/${product.image}`}
                                                 alt={product.title}/>
                                    </NavLink>
                                    : null
                                }
                                <CardBody>
                                    <CardTitle
                                        tag={RouterNavLink}
                                        to={`/product/${product._id}`}
                                    >
                                        {product.title}
                                    </CardTitle>
                                    <CardText>{product.price} $</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    )}

                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.load
});

const mapDispatchToProps = dispatch => ({
    orderProducts: (categoryId) => dispatch(orderProducts(categoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
