/*
 * File: app/view/ProgressPanel.js
 */
//------------------------------------------------------------------------------
Ext.define("Biofuels.view.ProgressPanel",{extend:"Ext.panel.Panel",alias:"widget.progressPanel",requires:["Biofuels.view.RoundStageBar","Biofuels.view.RoundStageMarker"],title:"Round Stage",titleAlign:"center",viewbox:!0,initNetworkEvents:function(){var e=Biofuels;e.network.registerListener("changeSettings",this.changeSettings,this)},initComponent:function(){var e=this;this.initNetworkEvents(),Ext.applyIf(e,{items:[{xtype:"draw",width:500,height:80,layout:"absolute",items:[{type:"rect",width:500,height:80,fill:"#163020"}]}]}),e.callParent(arguments)},changeSettings:function(e){if(!this.stageBar){var t=this.child("draw");this.stageBar=Ext.create("Biofuels.view.RoundStageBar"),this.stageBar.addToSurface(t.surface,60,35,380),this.setSeasonStage(1)}var n=new Array;e.contractsOn&&n.push("Contract"),n.push("Plant"),e.mgmtOptsOn&&n.push("Manage"),n.push("Grow","Year End"),this.stageBar.setMarkers(n)},setYear:function(e){this.stageBar.setYear(e)},setSeasonStage:function(e){this.stageBar.setStage(e,500)}});