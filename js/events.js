const keys = {
    w:{
     pressed:false
    },
 
    a:{
     pressed:false
    },
 
    d:{
     pressed:false
    },
 
    ArrowUp:{
     pressed:false
    },
 
    ArrowLeft:{
     pressed:false
    },
 
    ArrowRight:{
     pressed:false
    },
 }
 
 window.addEventListener('keydown', ({key})=>{
     //PLAYER KEYS
     if(!enemy.dead && !player.dead){
        switch(key){
            case 'w':{
                player.velocity.y = -15
                break
            }
    
            case 'a':{
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            }
    
            case 'd':{
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            }
    
            case ' ':{
                player.attack()
                break
            }
        }
     }
   
     
     //ENEMY KEYS
     if(!enemy.dead && !player.dead){
        switch(key){
            case 'ArrowUp':{
                enemy.velocity.y = -15
                break
            }
    
            case 'ArrowLeft':{
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            }
    
            case 'ArrowRight':{
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            }
    
            case 'ArrowDown':{
               enemy.attack()
                break
            }
        }
     }
    
 })
 
 window.addEventListener('keyup', ({key})=>{
     //player keys
     switch(key){
         case 'w':{
             keys.w.pressed = false
             break
         }
 
         case 'a':{
             keys.a.pressed = false
             break
         }
 
         case 'd':{
             keys.d.pressed = false
             break
         }
 
 
     }
 
     //enemy keys
     switch(key){
         case 'ArrowUp':{
             keys.ArrowUp.pressed = false
             break
         }
 
         case 'ArrowLeft':{
             keys.ArrowLeft.pressed = false
             break
         }
 
         case 'ArrowRight':{
             keys.ArrowRight.pressed = false
             break
         }
     }
 })
 