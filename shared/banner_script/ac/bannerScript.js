// Snow from https://codepen.io/radum/pen/xICAB
    
(function () {
    let COUNT = 300;
    let masthead = document.querySelector('.sky');
    
    if(masthead) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let width = masthead.clientWidth;
        let height = masthead.clientHeight;    
        
        let i = 0;
        let active = false;
        
        function onResize() {
            width = masthead.clientWidth;
            height = masthead.clientHeight;
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = '#FFF';
            
            let wasActive = active;
            active = width > 600;
            
            if (!wasActive && active)
                requestAnimFrame(update);
        }
        
        let Snowflake = function () {
            this.x = 0;
            this.y = 0;
            this.vy = 0;
            this.vx = 0;
            this.r = 0;
            
            this.reset();
        }
        
        Snowflake.prototype.reset = function() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.vy = 1 + Math.random() * 3;
            this.vx = 0.5 - Math.random();
            this.r = 1 + Math.random() * 2;
            this.o = 0.5 + Math.random() * 0.5;
        }
        
        canvas.style.position = 'absolute';
        canvas.style.left = canvas.style.top = '0';

        let snowflakes = [], snowflake;

        for (i = 0; i < COUNT; i++) {
            snowflake = new Snowflake();
            snowflake.reset();
            snowflakes.push(snowflake);
        }
        
        function update() {
        
            ctx.clearRect(0, 0, width, height);
            
            if (!active)
                return;
            
            for (i = 0; i < COUNT; i++) {
                snowflake = snowflakes[i];
                snowflake.y += snowflake.vy;
                snowflake.x += snowflake.vx;
            
                ctx.globalAlpha = snowflake.o;
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            
                if (snowflake.y > height) {
                snowflake.reset();
                }
        }
        
        requestAnimFrame(update);
        }
        
        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        
        onResize();
        window.addEventListener('resize', onResize, false);
        
        masthead.insertAdjacentElement('afterbegin', canvas);    
    }

})();