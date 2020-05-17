var observer = {
    handlers: {},

    register: function(event_name, handler, context)
    {
        var handler_array = this.handlers[event_name];

        if(undefined === handler_array){
            handler_array = this.handlers[event_name] = [];
        }

        handler_array.push({
            handler: handler,
            context : context
        });
    },

    unregister : function(event_name, handler, context){
        var handler_array = this.handlers[event_name];

        if(undefined === handler_array){
            return;
        }

        for(var index=0; index < handler_array.length; index++ ){
            var current_handler = handler_array[index];

            if( handler === current_handler['handler'] &&
                context === current_handler['context'] )
            {
                handler_array.splice(index, 1 );
                return;
            }
        }
    },

    notify:function(event_name, data){
        var handler_array = this.handlers[event_name];

        if (undefined === handler_array)   
            return;
        
        for(var index=0; index<handler_array.length; index++)
        {
            var current_handler = handler_array[index];

            current_handler['handler'].call(current_handler['context'], data);
        }
    }
};