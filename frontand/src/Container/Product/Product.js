import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteProduct, orderProduct} from "../../Store/Actions/actionProducts";
import Prelouder from "../../Components/Prelouder/Prelouder";
import {apiURL} from "../../apiURL";
import {Button} from "reactstrap";

class Product extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.orderProduct(id)
    }

    render() {
        const product = this.props.product;
        const category = product.categoryId && product.categoryId.title;
        const sellerName = product.userId && product.userId.fullName;
        const sellerPhone = product.userId && product.userId.phoneNumber;
        return (

            <div>
                {this.props.loading && <Prelouder/>}

                <h3 className="mb-3">{product.title}</h3>

                {product.image &&
                <img src={apiURL + '/uploads/' + product.image} className="item-img" alt={product.title}/>
                }
                <p><b>Категория:</b> {category}</p>
                {product.description &&
                <p>
                    <b>Описание:</b><br/>
                    {product.description}
                </p>
                }
                    <p><b>Цена:</b> {product.price} $</p>
                    <p><b>Продавец:</b> {sellerName}</p>
                    <p><b>Номер продавца:</b> {sellerPhone}</p>

                {this.props.user
                    ? <Button outline color="danger"
                              size="sm" className="mb-3"
                        onClick={() => this.props.deleteProduct(this.props.match.params.id)}
                    >Удалить продукт</Button>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.product,
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    orderProduct: (id) => dispatch(orderProduct(id)),
    deleteProduct: (id) =>dispatch (deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);