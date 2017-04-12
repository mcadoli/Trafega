(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('messagesFactory', function ($timeout) {
            var messages = [];
            return {
                defaultTimeOut: 4000,
                messages: messages,
                
                //Adiciona mensagem
                addMessage: function(message, type, id, timeout){
                    //{message, type, id}
                    //Type: error  
                   if(typeof message === 'object') {
                       var newMsg = '';
                       
                       message.forEach(function(msg, index) {
                           newMsg += ('   ' + (index + 1) + ': ' + msg);
                       }, this);
                       
                       message = newMsg.substr(2, newMsg.length);
                   }
                
                    var messageObj = {
                        message: message,
                        type: type,
                        id: id || Math.round(Math.random() * 1000000),
                        timeout: timeout || this.defaultTimeOut
                    }; 
                    
                    messages.push(messageObj);
                    
                    if(timeout !== false) {
                        (function(m, rm){
                            $timeout(function() {
                                rm(m);
                            }, messageObj.timeout);
                        })(messageObj, this.removeMessage);
                    }
                },
                
                //Remove uma mensagem específica
                removeMessage: function(messageObj) {
                    var id = null;
                
                    if(typeof messageObj === 'object') {
                        id = messageObj.id;
                    } else {
                        id = messageObj;
                    }
                    
                    for (var i = 0; i < messages.length; i++) {
                        if(messages[i].id == id) {
                            messages.splice(i, 1);
                            break;
                        }
                        
                    }
                },
                
                //Limpa todas as mensagens
                clearMessages: function() {
                    for(var alert in messages) {
                        delete messages[alert];
                    }
                }
            };
        });
})();