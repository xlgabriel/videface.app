import { useTranslation } from "react-i18next";

const TermsSection = ({ section }) => {
    if (!section) {
        return null;
    }

    return (
        <section className="mt-5">
            <h4 className="text-base font-semibold text-slate-900">{section.title}</h4>

            {section.p1 ? <p className="mt-2">{section.p1}</p> : null}
            {section.p2 ? <p className="mt-2">{section.p2}</p> : null}
            {section.therefore ? <p className="mt-2 font-medium">{section.therefore}</p> : null}

            {Array.isArray(section.bullets) && section.bullets.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                    {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            ) : null}

            {section.p3 ? <p className="mt-2">{section.p3}</p> : null}
            {section.p4 ? <p className="mt-2">{section.p4}</p> : null}
        </section>
    );
};

const TermsAndConditions = () => {
    const { t } = useTranslation("terms");
    const sections = t("sections", { returnObjects: true }) || {};

    return (
        <div className="p-4 mb-10 text-sm leading-relaxed">
            <p className="mb-4">{t("intro")}</p>

            {Object.keys(sections)
                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
                .map((sectionKey) => (
                    <TermsSection key={sectionKey} section={sections[sectionKey]} />
                ))}
        </div>
    );
};

export default TermsAndConditions;
