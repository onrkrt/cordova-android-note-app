/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);   
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById('save').addEventListener('click',saveThis);
        var storage = window.localStorage;
        function saveThis(){
           // alert('save')
            var text = document.getElementById('todo').value;
            var id = '';
            for(j = 0;j<15;j++){
                id += Math.floor(Math.random()*100).toString();
            }
     /*       var id =''
            while(id == ''){
                var storagelen = storage.length;
                if(storagelen  !== 0){
                    var keyMemory = [];
                    for(k = 0;k<storagelen;k++){
                        keyMemory.push(storage.key(k));
                    }
                    for(n = 0;n<15;n++){
                        id += Math.floor(Math.random()*50).toString();
                    }
                    if(keyMemory.includes(id)){
                        id = '';
                    }
                }
                else{
                    for(j = 0;j<15;j++){
                        id += Math.floor(Math.random()*50).toString();
                    }
                }
*/ 
         //  }
            document.getElementById('todo').value = "";
            storage.setItem(id,text);
            showTodos();
        };
        function showTodos(){
           // alert('here')
           //http://stackoverflow.com/a/3955238
            var parent = document.getElementById('main');
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }

            var l = localStorage.length;
            for(i = 0;i<l;i++){
                var div = document.createElement('div');
                div.classList.add('well');
                var deleteButtonText = document.createTextNode('delete');
                var deleteButton = document.createElement('button');
                                           deleteButton.classList.add('btn');
                                           deleteButton.classList.add('btn-danger');
                                           deleteButton.classList.add('delete-button');
                                           deleteButton.setAttribute('data-id',storage.key(i));
                                           deleteButton.appendChild(deleteButtonText); 
                                           deleteButton.addEventListener('click',deleteThis);
                div.textContent = storage.getItem(storage.key(i));
                div.appendChild(deleteButton);
                document.getElementById('main').appendChild(div);
            }
        };
        showTodos();
        function deleteThis(e){
            //alert(e.target.dataset.id);
            storage.removeItem(e.target.dataset.id);
            showTodos();
        }
    }
};

app.initialize();