import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  return (
    <body>
      {DragDropImageUploader()}
    </body>
  );
}

function DragDropImageUploader() {
  const shownav = useRef(true);
  const currentIndex = useRef(0);
  const [navMargin, setNavMargin] = useState('0');
  const [guideMargin, setGuideMargin] = useState('0');
  const [dragdropMargin, setDragdropMargin] = useState('1vw');
  const [imgHeight,setImgHeight] = useState('auto');
  const [imgWidth,setImgWidth]= useState('auto')
  const imgMaxHeight = useRef('100%');
  const imgMaxWidth = useRef('100%');
  const down = useRef(true);
  const [currentImg, setCurrentImg] = useState("");
  const images = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const getClearBtn=useRef((<></>))
  const ClearBtn=((
    <span className='clear' onClick={() => { images.current = []; setCurrentImg(""); getClearBtn.current=(<></>)}}>
      <div id='clear'>Clear all</div>
    </span>))
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (images.current.length === 0) {
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex.current !== images.current.length - 1) {
          currentIndex.current = currentIndex.current + 1;
        }
        else {
          return;
        }
      }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex.current !== 0) {
          currentIndex.current = currentIndex.current - 1;
        }
        else {
          return;
        }
      }
      else if(e.key==='a'){
        setImgHeight(()=>'');
        setImgWidth(()=>'');
        imgMaxHeight.current='100%';
        imgMaxWidth.current='100%';
      }
      else if(e.key==='s'){
        setImgHeight(()=>'100%');
        setImgWidth(()=>'auto');
        imgMaxHeight.current='';
        imgMaxWidth.current='';
      }
      else if(e.key==='d'){
        setImgHeight(()=>'auto');
        setImgWidth(()=>'100%');
        imgMaxHeight.current='';
        imgMaxWidth.current='';
      }
      else if(e.key==='f'){
        setImgHeight(()=>'auto');
        setImgWidth(()=>'auto');
        imgMaxHeight.current='';
        imgMaxWidth.current='';
      }
      else { return; }
      setCurrentImg(() => images.current[currentIndex.current].url)
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        console.log(e.key)
        if (shownav.current) {
          setDragdropMargin('-200px');
          setNavMargin('-300px');
          setGuideMargin('-500px')
          shownav.current = false;
        }
        else {
          
        }
        return;
      }
      else { return; }
      
    }
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [currentImg, currentIndex, images, shownav, navMargin, dragdropMargin]);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.current.some((e) => e.name === files[i].name)) {
        images.current.push(
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          }
        );
      }
    }
  }
  function deleteImage(index) {
    images.current.splice(index, 1)
    if (images.current.length === 0) { setCurrentImg(() => null); return; }
    currentIndex.current = 0;
    setCurrentImg(images.current[0].url)
    if(images.current.length!==0){
      getClearBtn.current=ClearBtn;
    }
    else{getClearBtn.current=(<></>);}
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      images.current.push(
        {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        }
      );
    }
    setCurrentImg(images.current[0].url)
    if(images.current.length!==0){
      getClearBtn.current=ClearBtn;
    }else{getClearBtn.current=(<></>);}
  }
  
  return (
  <>
    <div id='guide' style={{marginTop:guideMargin}}>
      <div style={{textAlign:'center',fontWeight:'bold',fontSize:'20px',marginBottom:'10px'}}>Keys Function</div>
      <div style={{display:'block', margin:'0 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'20px 20px 100px'}}>
          <span style={{gridColumnStart:'1',gridColumnEnd:'2'}}>a</span>
          <span style={{gridColumnStart:'2',gridColumnEnd:'3'}}>:</span>
          <span style={{gridColumnStart:'3',gridColumnEnd:'4'}}>See fit screen</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'20px 20px 100px'}}>
          <span style={{gridColumnStart:'1',gridColumnEnd:'2'}}>s</span>
          <span style={{gridColumnStart:'2',gridColumnEnd:'3'}}>:</span>
          <span style={{gridColumnStart:'3',gridColumnEnd:'4'}}>See fit height</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'20px 20px 100px'}}>
          <span style={{gridColumnStart:'1',gridColumnEnd:'2'}}>d</span>
          <span style={{gridColumnStart:'2',gridColumnEnd:'3'}}>:</span>
          <span style={{gridColumnStart:'3',gridColumnEnd:'4'}}>See fit width</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'20px 20px 100px'}}>
          <span style={{gridColumnStart:'1',gridColumnEnd:'2'}}>f</span>
          <span style={{gridColumnStart:'2',gridColumnEnd:'3'}}>:</span>
          <span style={{gridColumnStart:'3',gridColumnEnd:'4'}}>See original</span>
        </div>
      </div>
      
    </div>
    <div className='side'>
      <div id="nav" style={{ 'margin-left': navMargin, }}>
        <div className='container'>
          {getClearBtn.current}
          {images.current.map((image, index) => (
            <div className='image' key={index}>
              <span className='delete' onClick={() => {deleteImage(index); if(images.current.length!==0){
      getClearBtn.current=ClearBtn;
    }
    else{getClearBtn.current=(<></>);}}}>&times;</span>
              <img src={image.url} alt={image.name} id={index} className='navImg' onClick={() => { setCurrentImg(image.url); currentIndex.current = index; }} />
            </div>
          ))}
        </div>
      </div>
      <div className='card-container' style={{ 'right': dragdropMargin, }}><div className='card'>
        <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          {isDragging ? (
            <span className='select' style={{ fontSize: '20px' }}>Drop Image here</span>
          ) : (
            <>
              <div className='block'>
                <div className='blocktext'>
                  <div className='text'>Drag</div>
                  <div className='text'>&</div>
                  <div className='text'>Drop</div>
                  <div className='text'>here</div>
                </div>
                <div className='blocktext'>or</div>
                <div className='blocktext'>{""}
                </div>
                <span className='select blocktext' role='button' onClick={selectFiles} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                  Browse
                </span>
              </div>
            </>
          )}
          <input name='file' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect}></input>
        </div>
      </div></div>
    </div>
    <div id="touchable" onClick={() => {
      if (shownav.current) {
        shownav.current = false;
        setDragdropMargin('-200px');
        setNavMargin('-300px');
        setGuideMargin('-500px')
      }
      else {
        shownav.current = true;
        setDragdropMargin('1vw');
        setNavMargin('0');
        setGuideMargin('0')
      }
    }}>
      <img id='myImg' style={{height:imgHeight,width:imgWidth,maxHeight:imgMaxHeight.current,maxWidth:imgMaxWidth.current}} src={currentImg} alt=''></img>
    </div>
  </>
  

  )
}
export default App;
