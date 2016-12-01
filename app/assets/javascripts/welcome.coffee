(($) ->
  settings = carousels:
    speed: 4
    fadeIn: true
    fadeDelay: 250
  skel.breakpoints
    wide: '(max-width: 1680px)'
    normal: '(max-width: 1280px)'
    narrow: '(max-width: 960px)'
    narrower: '(max-width: 840px)'
    mobile: '(max-width: 736px)'
  $ ->
    $window = $(window)
    $body = $('body')
    # Disable animations/transitions until the page has loaded.
    $body.addClass 'is-loading'
    $window.on 'load', ->
      $body.removeClass 'is-loading'
      return
    # CSS polyfills (IE<9).
    if skel.vars.IEVersion < 9
      $(':last-child').addClass 'last-child'
    # Fix: Placeholder polyfill.
    $('form').placeholder()
    # Prioritize "important" elements on mobile.
    skel.on '+mobile -mobile', ->
      $.prioritize '.important\\28 mobile\\29', skel.breakpoint('mobile').active
      return
    # Dropdowns.
    $('#nav > ul').dropotron
      mode: 'fade'
      speed: 350
      noOpenerFade: true
      alignment: 'center'
    # Scrolly links.
    $('.scrolly').scrolly()
    # Off-Canvas Navigation.
    # Navigation Button.
    $('<div id="navButton">' + '<a href="#navPanel" class="toggle"></a>' + '</div>').appendTo $body
    # Navigation Panel.
    $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>').appendTo($body).panel
      delay: 500
      hideOnClick: true
      hideOnSwipe: true
      resetScroll: true
      resetForms: true
      target: $body
      visibleClass: 'navPanel-visible'
    # Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
    if skel.vars.os == 'wp' and skel.vars.osVersion < 10
      $('#navButton, #navPanel, #page-wrapper').css 'transition', 'none'
    # Carousels.
    $('.carousel').each ->
      console.log 'Hello carousel'
      $t = $(this)
      $forward = $('<span class="forward"></span>')
      $backward = $('<span class="backward"></span>')
      $reel = $t.children('.reel')
      $items = $reel.children('article')
      pos = 0
      leftLimit = undefined
      rightLimit = undefined
      itemWidth = undefined
      reelWidth = undefined
      timerId = undefined
      # Items.
      if settings.carousels.fadeIn
        $items.addClass 'loading'
        $t.onVisible (->
          `var timerId`
          timerId = undefined
          limit = $items.length - Math.ceil($window.width() / itemWidth)
          timerId = window.setInterval((->
            x = $items.filter('.loading')
            xf = x.first()
            if x.length <= limit
              window.clearInterval timerId
              $items.removeClass 'loading'
              return
            if skel.vars.IEVersion < 10
              xf.fadeTo 750, 1.0
              window.setTimeout (->
                xf.removeClass 'loading'
                return
              ), 50
            else
              xf.removeClass 'loading'
            return
          ), settings.carousels.fadeDelay)
          return
        ), 50
      # Main.

      $t._update = ->
        pos = 0
        rightLimit = -1 * reelWidth + $window.width()
        leftLimit = 0
        $t._updatePos()
        return

      if skel.vars.IEVersion < 9

        $t._updatePos = ->
          $reel.css 'left', pos
          return

      else

        $t._updatePos = ->
          $reel.css 'transform', 'translate(' + pos + 'px, 0)'
          return

      console.log $forward
      # Forward.
      $forward.appendTo($t).hide().mouseenter((e) ->
        timerId = window.setInterval((->
          pos -= settings.carousels.speed
          if pos <= rightLimit
            window.clearInterval timerId
            pos = rightLimit
          $t._updatePos()
          return
        ), 10)
        return
      ).mouseleave (e) ->
        window.clearInterval timerId
        return
      # Backward.
      $backward.appendTo($t).hide().mouseenter((e) ->
        timerId = window.setInterval((->
          pos += settings.carousels.speed
          if pos >= leftLimit
            window.clearInterval timerId
            pos = leftLimit
          $t._updatePos()
          return
        ), 10)
        return
      ).mouseleave (e) ->
        window.clearInterval timerId
        return
      # Init.
      $window.load ->
        reelWidth = $reel[0].scrollWidth
        skel.on 'change', ->
          if skel.vars.touch
            $reel.css('overflow-y', 'hidden').css('overflow-x', 'scroll').scrollLeft 0
            $forward.hide()
            $backward.hide()
          else
            $reel.css('overflow', 'visible').scrollLeft 0
            $forward.show()
            $backward.show()
          $t._update()
          return
        $window.resize(->
          reelWidth = $reel[0].scrollWidth
          $t._update()
          return
        ).trigger 'resize'
        return
      return
    return
  return
) jQuery