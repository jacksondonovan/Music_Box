angular.module('app',[])
  .component('carousel',{
    controller: function(){
      const vm = this
      vm.author = 'Jackson'
      vm.songs = 0
      vm.plussong = function(){
        vm.songs++
      }
      vm.minussong = function(){
        vm.songs--
      }
    },
    templateUrl: '/templates/tempindex.hbs'
  })
