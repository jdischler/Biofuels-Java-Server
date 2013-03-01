/*
 * File: app/view/Farm.js
 */
//------------------------------------------------------------------------------
Ext.define("Biofuels.view.Farm",{extend:"Ext.draw.Component",alias:"widget.Farm",renderTo:Ext.getBody(),FARM_WIDTH:445,FARM_HEIGHT:600,MAX_FIELDS:6,MAX_FIELDS_PER_ROW:2,FIELD_START_X:40,FIELD_START_Y:30,FIELD_SPACE_X:200,FIELD_SPACE_Y:160,HEALTH_ICON_SIZE:50,initNetworkEvents:function(){var e=Biofuels;e.network.registerListener("changeSettings",this.changeSettings,this),e.network.registerListener("loadFromServer",this.loadFromServer,this)},initComponent:function(){var e=this;this.initNetworkEvents(),this.HEALTH_ICON_X=this.FARM_WIDTH/2,this.HEALTH_ICON_Y=this.FARM_HEIGHT-105,Ext.applyIf(e,{items:[{type:"rect",width:this.FARM_WIDTH,height:this.FARM_HEIGHT,fill:"#385"}]}),e.callParent(arguments),this.fields=new Array},changeSettings:function(e){var t=e.fieldCount-this.fields.length;this.createFields(t),e.mgmtOptsOn?this.showFieldManagementIcons():this.hideFieldManagementIcons()},createFields:function(e){var t=e;this.fields.length<=0&&this.addFarmHealthIcon(this.HEALTH_ICON_X,this.HEALTH_ICON_Y,this.HEALTH_ICON_SIZE);if(this.fields.length<this.MAX_FIELDS){this.fields.length+t>this.MAX_FIELDS&&(t=this.MAX_FIELDS-this.fields.length);var n=0,r=0;for(var i=0;i<this.fields.length;i++)n++,n>=this.MAX_FIELDS_PER_ROW&&(n=0,r++);for(var i=0;i<t;i++){var s=this.addField(n*this.FIELD_SPACE_X+this.FIELD_START_X,r*this.FIELD_SPACE_Y+this.FIELD_START_Y);n++,n>=this.MAX_FIELDS_PER_ROW&&(n=0,r++)}}},loadFromServer:function(e){var t=e.fields.substring(1,e.fields.length-1).split(",");for(var n=0;n<t.length;n++){console.log(t[n]);var r=t[n].toLowerCase();console.log("creating "+this.fields.length),this.fields.length>n?this.fields[n].fieldVisuals.onPlantingClickHandler(r):(this.createFields(1),this.fields[n].fieldVisuals.onPlantingClickHandler(r))}},addField:function(e,t){var n={fieldVisuals:Ext.create("Biofuels.view.Field"),fieldData:Ext.create("Biofuels.view.FieldData"),fieldChart:Ext.create("Biofuels.view.FieldOverlay")};return n.fieldVisuals.attachTo(this.surface,e,t),n.fieldChart.attachTo(n.fieldData,this.surface,e,t),this.fields.push(n),n},addFarmHealthIcon:function(e,t,n){var r=[{type:"image",src:"resources/field_health_icon.png",x:e-n/2,y:t-n/2,opacity:.5,width:n,height:n,zIndex:1e3}],i=this.surface.add(r);for(var s=0;s<i.length;s++)i[s].show(!0);i[0].on({mouseover:this.onMouseOver,mouseout:this.onMouseOut,scope:i[0]}),i[0].on({click:this.onClick,scope:this}),this.healthIcon=i[0]},onMouseOver:function(e,t){this.stopAnimation().animate({duration:100,to:{scale:{x:1.1,y:1.1},opacity:1}})},onMouseOut:function(e,t){this.stopAnimation().animate({duration:100,to:{scale:{x:1,y:1},opacity:.5}})},onClick:function(e,t){var n=this.getNumberSeasons();if(!this.popupWindow){this.hideCrops(),this.hideFieldManagementIcons(),this.popupWindow=Ext.create("Biofuels.view.FieldHealthPopup"),this.popupWindow.setSliderCallback(n,this.onDrag,this.onChange,this),this.popupWindow.setCheckboxCallbacks(this.soilHealthChanged,this.yieldsChanged,this.showCropsChanged,this),this.popupWindow.on({close:function(e,t){this.showCrops(),this.showFieldManagementIcons(),this.popupWindow=null,this.healthIcon.show(!0),this.hideFieldHealth()},scope:this}),this.healthIcon.hide(),this.popupWindow.show();var r=t.getX(),i=t.getY();r-=this.popupWindow.getWidth()*.5,i-=this.popupWindow.getHeight()*.5,this.popupWindow.setPosition(r,i),this.setFieldSeason(0)}},soilHealthChanged:function(e,t,n,r){for(var i=0;i<this.fields.length;i++)t==1?this.fields[i].fieldChart.showSoilHealth():this.fields[i].fieldChart.hideSoilHealth()},yieldsChanged:function(e,t,n,r){for(var i=0;i<this.fields.length;i++)t==1?this.fields[i].fieldChart.showYields():this.fields[i].fieldChart.hideYields()},showCropsChanged:function(e,t,n,r){for(var i=0;i<this.fields.length;i++)t==1?this.fields[i].fieldChart.showCrop():this.fields[i].fieldChart.hideCrop()},showFieldHealth:function(){for(var e=0;e<this.fields.length;e++);},hideFieldHealth:function(){for(var e=0;e<this.fields.length;e++)this.fields[e].fieldChart.hide()},showCrops:function(){for(var e=0;e<this.fields.length;e++){var t=this.fields[e].fieldVisuals;t.showPlantingIcon(),t.showCrop()}},hideCrops:function(){for(var e=0;e<this.fields.length;e++){var t=this.fields[e].fieldVisuals;t.hidePlantingIcon(),t.hideCrop()}},showFieldManagementIcons:function(){for(var e=0;e<this.fields.length;e++){var t=this.fields[e].fieldVisuals;t.showManagementIcons()}},hideFieldManagementIcons:function(){for(var e=0;e<this.fields.length;e++){var t=this.fields[e].fieldVisuals;t.hideManagementIcons()}},onDrag:function(e){this.setFieldSeason(e.getValue())},onChange:function(e){this.setFieldSeason(e.getValue())},getNumberSeasons:function(){return this.fields.length<=0?1:this.fields[0].fieldData.getNumSeasons()},setFieldSeason:function(e){for(var t=0;t<this.fields.length;t++)this.fields[t].fieldChart.setCurrentSeason(e)}});