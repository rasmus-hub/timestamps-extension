import './Comment.css'

const NoComments = () => {
    return (
        <article className='yt-extension'>
            <section>
                <header className='yt-extension-header'>
                    <h2>Click a Timestamp</h2>
                    <p className='yt-extension-header-info'>
                        Obtain comments that have <strong>timestamps</strong> by the actual video 📌
                    </p>
                </header>
            </section>

            <div className='yt-extension-info'>
                <p><i>There are no comments with timestamps loaded 💤</i></p>
                <p><i><strong>¿Are you in the correct page?</strong></i></p>
            </div>
        </article>
    )
}

export default NoComments;