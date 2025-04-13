export default function ContactEmailTemplate({ message }) {
    const year = new Date().getFullYear();
    const styles = {
        contentContainer: {
            fontFamily: "'Geist', sans-serif",
            display: "block",
            width: "fit-content",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            textDecoration: "none",
        },
        infoContainer: {
            fontFamily: "'Geist', sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            textDecoration: "none",
            h3: {
                fontWeight: "600",
                fontSize: "18px",
                color: "#333333",
                textDecoration: "none",
            },
            p: {
                fontSize: "16px",
                display: "block",
                color: "#333333",
                marginBlockStart: "1em",
                marginBlockEnd: "1em",
                marginInlineStart: "0px",
                marginInlineEnd: "0px",
                textDecoration: "none",
            },
            ul: {
                display: "block",
                listStyleType: "disc",
                marginBlockStart: "1em",
                marginBlockEnd: "1em",
                marginInlineStart: "0px",
                marginInlineEnd: "0px",
                paddingInlineStart: "40px",
                textDecoration: "none",
            },
            li: {
                fontSize: "16px",
                marginBottom: "10px",
                color: "#333333",
                textDecoration: "none",
            },
            a: {
                fontWeight: "bold",
                color: "#0070f3",
                textDecoration: "none",
            },
            quotation: {
                fontSize: "14px",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
                color: "#555555",
                textDecoration: "none",
            },
        },

        footer: {
            fontFamily: "'Geist', sans-serif",
            display: "block",
            width: "100%",
            paddingTop: "30px",
            header: {
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
            },
            p: {
                color: "#8c8c8c",
                fontSize: "14px",
                lineHeight: "24px",
                textAlign: "center",
            },
            a: {
                color: "#454545",
                fontWeight: "bold",
                textDecoration: "none",
            },
            img: {
                width: "30px",
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
                borderLeftWidth: "0px",
                borderRightWidth: "0px",
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderLeftStyle: "solid",
                borderRightStyle: "solid",
            },
        },
    };

    return (
        <>
            <div style={styles.contentContainer}>
                <div style={styles.infoContainer}>
                    <h3 style={styles.infoContainer.h3}>Thank you for connecting with VideFace!</h3>
                    <p style={styles.infoContainer.p}>
                        We're thrilled to have had the chance to bring value to your company. Your interest in VideFace
                        means a lot to us, and we're excited to explore how we can assist you further. Here's a quick
                        recap of what we can offer:
                    </p>
                    <ul style={styles.infoContainer.ul}>
                        <li style={styles.infoContainer.li}>
                            <strong>Reduce operational costs.</strong> Our solutions are designed to optimize your
                            workflow and lower unnecessary expenses by up to 60%.
                        </li>
                        <li style={styles.infoContainer.li}>
                            <strong>Improve service speed and availability.</strong> With 24/7 virtual attention and
                            automated processes, your customers enjoy faster service and shorter lines.
                        </li>
                        <li style={styles.infoContainer.li}>
                            <strong>Enhance transparency.</strong> Get full traceability of every interaction with clear
                            evidence and logs.
                        </li>
                        <li style={styles.infoContainer.li}>
                            <strong>Scale efficiently.</strong> Whether you’re in the U.S., Europe, or beyond, our
                            modular approach grows with your needs.
                        </li>
                        <li style={styles.infoContainer.li}>
                            Stay connected with us! Follow our{" "}
                            <a
                                style={styles.infoContainer.a}
                                href="https://linkedin.com/company/videface/"
                                target="_blank"
                            >
                                LinkedIn
                            </a>{" "}
                            and{" "}
                            <a
                                style={styles.infoContainer.a}
                                href="https://instagram.com/videface.app/"
                                target="_blank"
                            >
                                Instagram
                            </a>{" "}
                            profiles for updates, news, and more about our services.
                        </li>
                        <p style={styles.infoContainer.quotation}>"{message}"</p>
                    </ul>
                    <p style={styles.infoContainer.p}>We're looking forward to staying in touch.</p>
                    <p style={styles.infoContainer.p}>Warm regards,</p>
                </div>
                <footer style={styles.footer}>
                    <div style={styles.footer.header}>
                        <a
                            style={styles.footer.a}
                            href="https://videface.app/"
                            target="_blank"
                            data-saferedirecturl="https://videface.app/"
                            rel="noreferrer nowrapper"
                        >
                            <img style={styles.footer.img} src="https://i.imgur.com/GMVirFc.png" alt="VidefaceLogo" />
                        </a>
                    </div>
                    <p style={styles.footer.p}>
                        <a style={styles.footer.a} href="">
                            VideFace
                        </a>{" "}
                        <br />
                        Feel free to reply to this email if you have any questions or concerns.
                        <br />
                        Copyright © {year} VideFace App. All rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
