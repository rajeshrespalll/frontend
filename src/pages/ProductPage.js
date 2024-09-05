const ProductPage = ({ match }) => {
    const { id } = match.params;
    return (
        <div>
        <h1>Product {id}</h1>
        </div>
    );
    }
    
    export default ProductPage;
