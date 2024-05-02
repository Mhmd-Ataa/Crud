import { useEffect, useState } from 'react';
import './App.css';


// get data from localStorage

function getData() {
  let data = localStorage.getItem("allDta")
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

function App() {

  // put all inputs here
  const [all, setAll] = useState(getData())

  // each input field
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function handleSubmit(evevt) {
    evevt.preventDefault();
    let book = {
      name,
      email,
      phone
    }
    setAll([...all, book]);
    setName("");
    setEmail("");
    setPhone("")
  }

  useEffect(() => {
    localStorage.setItem("allDta", JSON.stringify(all))
  }, [all])

  function deleFunction(phone) {
    const delUser = all.filter((element) => {
      return element.phone !== phone
    })
    setAll(delUser);
  }



  return <>
    <div className="vh-100">
      <div className="container">
        <div className="row justify-content-between align-items-center vh-100">
          <div className="col-md-5">

            <form className="fields  p-3" onSubmit={handleSubmit}>
            <h3 className="mb-3" >Create User</h3>

              <div className="box">
                <label htmlFor="" className="ms-1 mb-1">Name :</label>
                <input type="text" name="name" className="form-control"
                  onChange={(e) => setName(e.target.value)} value={name} required />
              </div>

              <div className="box my-2">
                <label htmlFor="" className="ms-1 mb-1">E-mail :</label>
                <input type="email" name="email" className="form-control"
                  onChange={(e) => setEmail(e.target.value)} value={email} required />
              </div>

              <div className="box">
                <label htmlFor="" className="ms-1 mb-1">Phone :</label>
                <input type="tel" name="phone" className="form-control"
                  onChange={(e) => setPhone(e.target.value)} value={phone} required/>
              </div>

              <button className="btn btn-success form-control mt-4" style={{color:"black"}}>Add User</button>

            </form>
          </div>
          <div className="col-md-6">
            <div className="view p-3">
              {all.length > 0 &&
                <>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Phone</th>
                          <th>Delete</th>

                        </tr>
                      </thead>
                      <tbody>
                        {all.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className="text-center"><i  class="fa-solid fa-trash" onClick={(e) => deleFunction(item.phone)}></i></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="btn btn-danger form-control mt-3" onClick={()=>setAll([])}>Delete All</button>

                  </div>
                </>
              }
              {all.length < 1 && <div>empty</div>}


            </div>
          </div>


        </div>
      </div>




    </div>
  </>


}

export default App;
