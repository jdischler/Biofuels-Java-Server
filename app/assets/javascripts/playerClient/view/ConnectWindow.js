Ext.define('Biofuels.view.ConnectWindow', {
    extend: 'Ext.window.Window',
    id: 'connectWindow',

    height: 292,
    width: 456,
    layout: {
        type: 'absolute'
    },
    closable: false,
    title: 'Connecting to Server',
    titleAlign: 'center',


    initComponent: function() {
        var me = this;

        var store1 = Ext.create('Ext.data.JsonStore', {
            storeId: 'loadStore',
            fields: ['data1'],
            data: [
              {'data1':0}
            ]
        });


        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 20,
                    width: 420,
                    fieldLabel: '',
                    emptyText: 'Loading...'
                },
                {
                    xtype: 'chart',
                    x: 70,
                    y: 60,
                    height: 180,
                    width: 310,
                    animate: true,
                    insetPadding: 35,
                    store: store1,
                    theme: 'Category5',
                    axes: [
                        {
                            position: 'gauge',
                            type: 'Gauge',
                            margin: 5,
                            maximum: 3,
                            minimum: 0,
                            steps: 3
                        }
                    ],
                    series: [
                        {
                            type: 'gauge',
                            field: 'data1',
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    incCounter: function(){
      var store = Ext.data.StoreManager.lookup('loadStore').getAt(0)
      store.set("data1", store.get("data1") + 1 )
      if(store.get("data1")>2){
        var joinPopup = Ext.create('Biofuels.view.JoinGamePopup');
        joinPopup.show();
        Ext.getCmp('connectWindow').close();
      }
    }

});