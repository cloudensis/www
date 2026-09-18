import { company } from "#/src/domains/company/constants";
import { Section } from "#/src/interfaces/components/layout/section";
import { DescriptionList } from "#/src/interfaces/components/ui/description-list";

export function Template() {
	return (
		<div class="mx-auto max-w-5xl space-y-12 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">プライバシーポリシー</h1>

			<div class="space-y-4">
				<p>
					{company.name}
					（以下「当社」といいます）は、当社が運営するウェブサイト（以下「本サイト」といいます）において取得する個人情報の取扱いについて、個人情報の保護に関する法律（以下「個人情報保護法」といいます）その他の関連法令およびガイドラインを遵守し、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
				</p>
				<p>
					本サイトのお問い合わせフォームをご利用いただく際は、本ポリシーの内容をご確認のうえ、ご同意いただく必要があります。
				</p>
			</div>

			<Section id="collected-information" title="1. 取得する個人情報">
				<div class="space-y-4">
					<p>
						当社は、本サイトのお問い合わせフォームを通じて、お客様から以下の情報を取得します。
					</p>
					<ul class="list-disc space-y-1 pl-6">
						<li>お名前</li>
						<li>会社名</li>
						<li>メールアドレス</li>
						<li>お問い合わせ種別</li>
						<li>お問い合わせ内容</li>
					</ul>
					<p>
						当社は、偽りその他不正の手段によって個人情報を取得することはありません。なお、上記の情報をご入力いただけない場合、お問い合わせにお答えできないことがあります。
					</p>
				</div>
			</Section>

			<Section id="purpose-of-use" title="2. 利用目的">
				<div class="space-y-4">
					<p>当社は、取得した個人情報を以下の目的で利用します。</p>
					<ul class="list-disc space-y-1 pl-6">
						<li>お問い合わせへの回答およびご連絡のため</li>
						<li>
							お問い合わせいただいた内容の確認、ご相談・ご依頼への対応のため
						</li>
						<li>
							お問い合わせに関連するご提案、お見積り、契約手続き等のご連絡のため
						</li>
						<li>お問い合わせに関する記録を保管し、対応履歴を管理するため</li>
					</ul>
					<p>
						当社は、法令で認められる場合を除き、お客様の同意なく上記の目的の範囲を超えて個人情報を利用しません。利用目的を変更する場合は、変更後の利用目的を本サイトに掲載してお知らせします。
					</p>
				</div>
			</Section>

			<Section id="third-party-provision" title="3. 第三者への提供">
				<div class="space-y-4">
					<p>
						当社は、次に掲げる場合を除き、あらかじめお客様の同意を得ることなく、個人情報を第三者に提供しません。
					</p>
					<ul class="list-disc space-y-1 pl-6">
						<li>法令に基づく場合</li>
						<li>
							人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難であるとき
						</li>
						<li>
							公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、お客様の同意を得ることが困難であるとき
						</li>
						<li>
							国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
						</li>
					</ul>
				</div>
			</Section>

			<Section id="outsourcing" title="4. 個人情報の取扱いの委託">
				<div class="space-y-4">
					<p>
						当社は、利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または一部を外部の事業者（メール配信サービスやクラウドサービスの提供事業者を含みます）に委託することがあります。この場合、当社は委託先を適切に選定し、委託先において個人情報の安全管理が図られるよう、必要かつ適切な監督を行います。
					</p>
					<p>
						委託先が外国にある事業者である場合には、個人情報保護法の定めに従い、必要な措置を講じます。
					</p>
				</div>
			</Section>

			<Section id="retention-period" title="5. 保存期間">
				<p>
					当社は、取得した個人情報を、利用目的の達成に必要な期間に限り保存し、その後は遅滞なく削除または消去します。ただし、法令により保存が義務付けられている場合はこの限りではありません。
				</p>
			</Section>

			<Section id="security-measures" title="6. 安全管理措置">
				<div class="space-y-4">
					<p>
						当社は、個人情報の漏えい、滅失または毀損を防止するため、以下のとおり必要かつ適切な安全管理措置を講じます。
					</p>
					<ul class="list-disc space-y-1 pl-6">
						<li>
							個人情報の取扱いに関する責任者を定め、取扱状況を把握・管理します（組織的安全管理措置）
						</li>
						<li>
							個人情報を取り扱う者に対し、適切な取扱いについての教育・周知を行います（人的安全管理措置）
						</li>
						<li>
							個人情報を取り扱う機器・電子媒体等の盗難・紛失を防止し、不要となった個人情報を適切に削除・廃棄します（物理的安全管理措置）
						</li>
						<li>
							個人情報へのアクセス制御、通信の暗号化、不正アクセス対策等を実施します（技術的安全管理措置）
						</li>
						<li>
							外国において個人情報を取り扱う場合は、当該国の制度等を把握したうえで必要な措置を講じます（外的環境の把握）
						</li>
					</ul>
				</div>
			</Section>

			<Section id="cookies" title="7. Cookie・外部サービスの利用">
				<div class="space-y-4">
					<p>
						本サイトのお問い合わせフォームでは、不正な自動送信を防ぐため、Cloudflare,
						Inc.（米国）が提供するボット判定サービス「Cloudflare
						Turnstile」を利用しています。Turnstileは判定のために、IPアドレスやブラウザに関する情報を同社に送信し、Cookieを使用することがあります。詳細は同社のプライバシーポリシーをご確認ください。
					</p>
					<p>本サイトでは、アクセス解析ツールは使用していません。</p>
				</div>
			</Section>

			<Section id="disclosure-requests" title="8. 開示・訂正・利用停止等の請求">
				<div class="space-y-4">
					<p>
						お客様は、当社が保有するご自身の個人情報について、個人情報保護法の定めに基づき、利用目的の通知、開示、内容の訂正・追加・削除、利用の停止・消去、第三者への提供の停止を請求することができます。ご希望の場合は、「9.
						お問い合わせ窓口」に記載の方法でご連絡ください。
					</p>
					<p>
						ご請求にあたっては、ご本人であることを確認させていただく場合があります。当社は、ご請求を受け付けた後、遅滞なく対応します。ただし、法令上の要件を満たさない場合や、当社が開示等の義務を負わない場合には、ご請求に応じられないことがあります。なお、ご請求に際して手数料はいただきません。
					</p>
				</div>
			</Section>

			<Section id="contact" title="9. お問い合わせ窓口">
				<div class="space-y-4">
					<p>
						個人情報の取扱いに関するお問い合わせ、ご意見・苦情、および前項の請求は、以下の窓口までご連絡ください。
					</p>
					<DescriptionList
						items={[
							{ term: "事業者名", details: company.name },
							{ term: "代表者", details: company.representative },
							{
								term: "所在地",
								details: (
									<>
										<p>〒{company.postalCode}</p>
										<p>{company.address}</p>
									</>
								),
							},
							{
								term: "受付方法",
								details: (
									<>
										本サイトの
										<a href="/contact" class="underline">
											お問い合わせフォーム
										</a>
										よりご連絡ください
									</>
								),
							},
						]}
					/>
				</div>
			</Section>

			<Section id="revision" title="10. 本ポリシーの改定">
				<p>
					当社は、法令の改正や事業内容の変更等に応じて、本ポリシーを改定することがあります。改定後の本ポリシーは、本サイトに掲載した時点から効力を生じます。
				</p>
			</Section>

			<p>
				制定日：2026年9月17日
				<br />
				{company.name}
			</p>
		</div>
	);
}
