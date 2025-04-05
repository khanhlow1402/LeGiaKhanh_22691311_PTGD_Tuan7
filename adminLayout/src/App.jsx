import './App.css'
import avt from './assets/avt.png'
import bell from './assets/bell.png'
import ques from './assets/question.png'
import search from './assets/search.png'

function App() {

  return (
    <div className='container'>
      <div className='left'>
        LEFT
      </div>
      <div className='right1'> 
            <h2>Dashboard</h2>
            <div className="search-box">
            <img src= {search} />
              <input type="text" className="search-input" placeholder="Search..." />
            </div>
            <div className='headUser'>
            <img src= {bell}  />
            <img src= {ques}  />

                <img src= {avt} alt="User" className="avatar" />
            </div>
           
      </div>
      <div className='right2'>
        RIGHT 2
      </div>
      <div className='right3'>
    RIGHT3
      </div>
    </div>
  )
}

export default App
