import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../src/utils/api';

export default function MyForms() {
    const [gridView, setGridView] = useState(true);
    const [forms, setForms] = useState([]);
    const [globallimit,setGloballimit]=useState(10);
    const [nextCursor, setNextCursor] = useState(null);
    var cursorval=null;
    var scroll_data=[];
    var cursor_list=[];
    var observer_list=[];
    var element_thresholdlist=[];
    var intersectionCounter=0;
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    useEffect(() => {
      fetchForms(null);
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const processforms = function (data) {
        for (let i = 0; i < data.length; i++) {
          const targetId = `item${data[i].it}`;
          const targetElement = document.querySelector(`#${targetId}`);
      
          if (targetElement) {
            const intersectionCallback = (entries) => {
              entries.forEach((entry) => {
               
                const box = entry.target;
                const visiblePct = `${Math.floor(entry.intersectionRatio * 100)}%`;
                if (entry.intersectionRatio >= 0.75 && !element_thresholdlist.includes(box.id)) {
                  intersectionCounter++;
                  element_thresholdlist.push(box.id);
                  console.log(intersectionCounter);
                  console.log(element_thresholdlist);
                }
      
                
                console.log(`Element ${box.id} is ${visiblePct} visible`);
              });
            };
      
           
            const observer = new IntersectionObserver(intersectionCallback, observerOptions);
            observer.observe(targetElement);
            observer_list.push(observer);
          }
        }
      };
      const fetchForms = async (cursor) => {
        try {
          const form_obj = {
              cursor_val:cursor,
              limit:20
            };
            
            const config = {
              headers: {
                'Content-Type': 'application/json',
                
              }
            };
          const response = await axios.post(API_ENDPOINTS.FETCHFORMS,form_obj,config);
          if(response && response.data && response.data.data){
            setForms((prevForms) => [...prevForms, ...response.data.data]);
              scroll_data.push(response.data.data);
              cursorval=response.data.nextCursor;
              setNextCursor(response.data.nextCursor);
              processforms(response.data.data);
          }
         
        } catch (error) {
          console.error('Error fetching forms:', error);
        }
      };
      const handleScroll = () => {
        processforms(scroll_data);
        if (
          // window.innerHeight + document.documentElement.scrollTop ===
          // document.documentElement.offsetHeight
          (window.innerHeight + Math.round(window.scrollY)) >= 0.7*document.body.offsetHeight
        ) 
        {
          if (nextCursor||cursorval) {
              let param=nextCursor?nextCursor:(cursorval?cursorval:null);
              if(!cursor_list.includes(param)){
                  cursor_list.push(param);
                  fetchForms(param);
              }else{
                  param=param+globallimit
                  if (!cursor_list.includes(param))
                  {
                    cursor_list.push(param);
                    fetchForms(param);
                  }
                 
              }
            
          }
        }
      };
      const handleClick = () => {

      }

      return (
        <div>
            <div className='header'>
            </div>
            <div className='preview'>
            </div>
            <div className='formslist'>
                {gridView ? (
                    <div>
                        {forms.map((form, index) => {
                            const row = Math.floor(index / 5);
                            const col = index % 5;
                            return (
                                <div key={index} style={{
                                    marginTop: `${30 * row}px`,
                                    marginLeft:`${84*(col+1)}px`,
                                    marginRight: `${84*(5-col)}px`,
                                    height: '169px',
                                    width: '208px',
                                    position: 'absolute',
                                }} onClick={handleClick}>
                                    <img src='' style={{position: 'absolute', height:'100%',
                                    width: '100%'}} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
        </div>
    );
    
    
}
