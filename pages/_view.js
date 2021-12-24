import Image from 'next/image'

const ScrollTopView = (props) => {
    const { onScroll, onVisbile, visible } = props

    console.log(visible)
    if (typeof window === 'object') window.addEventListener('scroll', onVisbile)

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 10
                }}>

                <button

                    onClick={onScroll}
                    style={{ border: 0, background: 'transparent', display: visible ? 'inline-block' : 'none', borderRadius: 5 }}>
                    <Image src='/images/top.png' alt='top' width={48} height={48} />
                </button>
            </div>
        </>
    )
}

export default ScrollTopView