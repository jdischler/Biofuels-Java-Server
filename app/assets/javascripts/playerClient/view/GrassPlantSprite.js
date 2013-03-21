/*
 * File: app/view/GrassPlantSprite.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.GrassPlantSprite', {
//------------------------------------------------------------------------------

    constructor: function (config) {

    	this.randomSpriteConfigList = Array([{
			type: 'image',
			src: 'resources/grass_plant.png',
			width: 30,
			height: 50,
			zIndex: 750
		},
		{
			type: 'image',
			src: 'resources/grass_plant_2.png',
			width: 30,
			height: 50,
			zIndex: 750
		}]);
    },

    //--------------------------------------------------------------------------
    addToSurface: function(surface, atX, atY, duration) {

		var randomSpriteConfig = this.randomSpriteConfigList[
				Math.floor(Math.random() * this.randomSpriteConfigList.length)];

		if (this.sprite) {
			this.removeFromSurface();
		}

  		var result = surface.add(randomSpriteConfig);
  		this.sprite = result[0];
		this.sprite.setAttributes({
			translate: {
				x: atX,
				y: atY
			}}, false);

		this.sprite.animate({
			duration: duration,
			from: {
				scale: {
					x: 0.2,
					y: 0.2
				},
				translate: {
					x: atX,
					y: atY + 20 * 0.8
				}
			},
			to: {
				scale: {
					x: 1,
					y: 1
				},
				translate: {
					x: atX,
					y: atY
				}
			}
		});
    },


    //--------------------------------------------------------------------------
    removeFromSurface: function() {

    	if (!this.sprite) return;

    	this.sprite.remove();
    	this.sprite.destroy();
    	this.sprite = null;
    },

    setOpacity: function(opa){
      // console.log(this.sprite)
      if(!this.sprite) return;
      this.sprite.setAttributes({
        opacity: opa
      }, true)
    },
    growABit: function(){
      if(!this.sprite) return;
      this.sprite.animate({
        duration: 5500,
        from: {
          scale: {
            x: 1,
            y: 1
          },

        },
        to: {
          scale: {
            x: 1.2,
            y: 1.2
          },
        }
      });
    }
});
