Vue.component('ws-parameter', {
  props: ['name','desc','value','unit','min','max', 'readonly'],
  template: '\
  <div class="form-group" :title = "desc">\
      <label for = "t" class = "sr-only">{{desc}}:</label>\
      <div class="input-group">\
          <div class="input-group-prepend" >\
              <div class="input-group-text parameter-class">\
                  {{name}}\
              </div>\
          </div>\
          <input :disabled = "readonly" v-on:keyup = "inputKeyUp" v-bind:class = "{\'is-invalid\': wrongvalue}" class = "form-control" step = "any" required type="number" id="t" v-bind:placeholder="desc" v-bind:value="value" v-on:input="updateValue($event.target.value)">\
          <div class="input-group-append">\
            <div class="input-group-text unit-class">\
                {{unit}}\
            </div>\
          </div>\
          <div class="invalid-feedback">\
              Введенное число не допустимо.\
          </div>\
      </div>\
  </div>',
  computed: {
      wrongvalue: function (){
          if ( this.value == null|| this.value.length == 0)
          return false;
          return (this.value < this.min || this.value > this.max);
      },
  },
  methods: {
      inputKeyUp: function (){
          this.$emit("keyup");
      },
      updateValue: function (value) {
      this.$emit('input', value)
    }
  }
})
new Vue ({
    el: '#app',
    data: {
        P: '',
        T: '',
        V: '',
        S: '',
        H: '',
        U: '',
        W: '',
        X: 0,
        Cp: '',
        Cv: ''
    },
        methods: {
            refreshMessage() {
            this.$http.jsonp('http://new.thermalmodeler.ru/api/water/saturationline/?P='+this.P+';X='+this.X).then(response => {
                this.V = response.body.V;
                this.S = response.body.S;
                this.H = response.body.H;
                this.U = response.body.U;
                this.X = response.body.X;
                this.Cp = response.body.Cp;
                this.Cv = response.body.Cv;
                this.W = response.body.W;
                this.T = response.body.T;
                    });
                    },
                    refreshX: function(X) {
                        this.X = X;
                        this.refreshMessage ();
                    }
                }
            })
