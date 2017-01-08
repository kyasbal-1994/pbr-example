function n(value){
  return value.map(f=>f/255);
}

gr(function(){
  const $$ = gr("#canvas");
  let usingMap = false;
  let usingTexture = false;
  let values = {
    roughness:0.1,
    useRoughnessMap:function(){
      usingMap = !usingMap;
      $$("mesh").setAttribute("roughnessMap",usingMap ? "./uvg.jpg":null);
    },
    useTexture:function(){
      usingTexture = !usingTexture;
      $$("mesh").setAttribute("texture",usingTexture ? "./uvg.jpg":null);

    },
    dirColor:[0,0,255]
  };
  for(let i = 1; i < 6; i++){
    values["albedo" + i] = [255,255,255,255];
    values["emission" + i] = [0,0,0];
    values["lColor" + i] = [255,255,255];
    values["lIntensity" + i] = 1;
  }
  const gui = new dat.GUI();
  let controller = gui.add(values,"roughness",0,1);
  controller.onChange((value)=>{
    $$("mesh").setAttribute("roughness",value);
  });
  for(let i = 1; i < 6; i++){
    let controller = gui.addColor(values,"albedo" + i);
    controller.onChange((value)=>{
      $$("mesh#m" + i).setAttribute("albedo",n(value));
    });
    controller = gui.addColor(values,"emission" + i);
    controller.onChange((value)=>{
      $$("mesh#m" + i).setAttribute("emission",n(value));
    });
  }
  for(let i = 1; i < 6; i++){
    let controller = gui.addColor(values,"lColor" + i);
    controller.onChange((value)=>{
      $$("light#lp" + i).setAttribute("color",n(value));
    });
    controller = gui.add(values,"lIntensity" + i);
    controller.onChange((value)=>{
      $$("light#lp" + i).setAttribute("intensity",value);
    });
  }
  controller = gui.addColor(values,"dirColor");
  controller.onChange((value)=>{
    $$("light#d").setAttribute("color",n(value));
  });
  gui.add(values,"useRoughnessMap");
  gui.add(values,"useTexture");
});
