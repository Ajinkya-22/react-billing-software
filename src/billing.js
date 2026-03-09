import { useEffect, useState } from "react";

function Billing() {

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQty, setProductQty] = useState(0);

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [total, setTotal] = useState(0);
  const [totalqty, setTotalqty] = useState(0);


  // Load LocalStorage Data
  useEffect(() => {

    const storedData = localStorage.getItem("billingData");

    if(storedData){
      setData(JSON.parse(storedData));
    }

  }, []);


  // Save LocalStorage + Total Calculate
  useEffect(() => {

    localStorage.setItem("billingData", JSON.stringify(data));

    let sum = 0;
    let qty = 0;

    for(let i=0;i<data.length;i++){

      sum = sum + Number(data[i].productTotal);
      qty = qty + Number(data[i].productQty);

    }

    setTotal(sum);
    setTotalqty(qty);

  }, [data]);


  function addNow(){

    if(productName === "" || productPrice === 0 || productQty === 0){
      alert("Enter Product Details");
      return;
    }

    const obj = {
      productName,
      productPrice,
      productQty,
      productTotal : productPrice * productQty
    };

    if(editIndex !== null){

      const newData = [...data];
      newData[editIndex] = obj;
      setData(newData);

      setEditIndex(null);

    }else{

      setData([...data,obj]);

    }

    setProductName("");
    setProductPrice(0);
    setProductQty(0);

  }


  function removeData(i){

    const newData = [...data];
    newData.splice(i,1);
    setData(newData);

  }


  function editData(i){

    setProductName(data[i].productName);
    setProductPrice(data[i].productPrice);
    setProductQty(data[i].productQty);

    setEditIndex(i);

  }


  function clearAll(){
    setData([]);
  }


  return (

    <div>

      <h2 className="text-center mb-4">Billing Software</h2>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>

          <tr>

            <td>
              <input
              className="form-control"
              type="text"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              />
            </td>

            <td>
              <input
              className="form-control"
              type="number"
              value={productPrice}
              onChange={(e)=>setProductPrice(Number(e.target.value))}
              />
            </td>

            <td>
              <input
              className="form-control"
              type="number"
              value={productQty}
              onChange={(e)=>setProductQty(Number(e.target.value))}
              />
            </td>

            <td>
              <input
              className="form-control"
              readOnly
              value={productPrice * productQty}
              />
            </td>

            <td>

              <button
              className="btn btn-success"
              onClick={addNow}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>

            </td>

          </tr>

        </thead>

        <tbody>

          {data.map((val,i)=>(
            <tr key={i}>

              <td>{val.productName}</td>
              <td>{val.productPrice}</td>
              <td>{val.productQty}</td>
              <td>{val.productTotal}</td>

              <td>

                <button
                className="btn btn-warning me-2"
                onClick={()=>editData(i)}
                >
                  Edit
                </button>

                <button
                className="btn btn-danger"
                onClick={()=>removeData(i)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

        <tfoot className="table-secondary">

          <tr>

            <th colSpan={2}>Grand Total</th>
            <th>{totalqty}</th>
            <th>{total}</th>

            <th>
              <button
              className="btn btn-dark"
              onClick={clearAll}
              >
                Clear
              </button>
            </th>

          </tr>

        </tfoot>

      </table>

    </div>

  );
}

export default Billing;