let slide_imgs = document.querySelectorAll('#slide-img img')

let slide_infos = document.querySelectorAll('.slide-info')

let hero_imgs_animate = []

slide_imgs.forEach((e, index) => {
    let next_img = slide_imgs[index === slide_imgs.length - 1 ? 0 : index + 1].getAttribute('src')

    let animation = new hoverEffect({
        parent: document.querySelector('#slide-img'),
        intensity: 0.3,
        image1: e.getAttribute('src'),
        image2: next_img,
        displacementImage: 'images/distortion.jpg',
        hover: false
    })

    hero_imgs_animate.push(animation)
})

// remove images
slide_imgs.forEach(e => e.remove())

let curr_item = 0

showSlideIndex = (index) => {
    document.querySelector('#hero-slide-index').innerHTML = `${index + 1}/${slide_imgs.length}`
}

nextSlide = () => {
    let prev_item = curr_item
    curr_item = (curr_item + 1) % hero_imgs_animate.length

    // image animation
    hero_imgs_animate[prev_item].next()

    // change slide info
    document.querySelector('.slide-info.active').classList.remove('active')
    slide_infos[curr_item].classList.add('active')

    showSlideIndex(curr_item)

    setTimeout(() => {
        let canvas = document.querySelectorAll('#slide-img canvas')
        document.querySelector('#slide-img').appendChild(canvas[0])
        hero_imgs_animate[prev_item].previous()
    }, 1200);
}

prevSlide = () => {
    curr_item = curr_item - 1 < 0 ? hero_imgs_animate.length - 1 : curr_item - 1

    // image animation
    hero_imgs_animate[curr_item].next()

    // change slide info
    document.querySelector('.slide-info.active').classList.remove('active')
    slide_infos[curr_item].classList.add('active')

    showSlideIndex(curr_item)

    setTimeout(() => {
        let canvas = document.querySelectorAll('#slide-img canvas')
        document.querySelector('#slide-img').insertBefore(canvas[canvas.length - 1], document.querySelector('#slide-img').firstChild)
        hero_imgs_animate[curr_item].previous()
    }, 1200);
}

document.querySelector('#hero-slide-toggle-next').onclick = () => {
    nextSlide()
}

document.querySelector('#hero-slide-toggle-prev').onclick = () => {
    prevSlide()
}

// auto slide

let auto_slide = setInterval(nextSlide, 5000)

document.querySelector('.hero-section').onmouseover = () => {
    clearInterval(auto_slide)
}

document.querySelector('.hero-section').onmouseleave = () => {
    auto_slide = setInterval(nextSlide, 5000)
}

document.querySelectorAll('.products-slide').forEach(e => {
    new Glide(e.querySelector('.glide'), {
        type: 'slider',
        starAt: 0,
        perView: 4,
        rewind: false,
        bound: true
    }).mount()
})

document.querySelectorAll('.product-img').forEach(e => {
    e.style.width = e.parentElement.offsetWidth + 'px'
    e.style.height = e.parentElement.offsetWidth + 'px'

    new hoverEffect({
        parent: e,
        intensity: 0.6,
        image1: e.getAttribute('data-img-1'),
        image2: e.getAttribute('data-img-2'),
        displacementImage: 'images/distortion.jpg'
    })
})

new Glide('.gallery-slide', {
    type: 'carousel',
    starAt: 0,
    perView: 8,
}).mount()
