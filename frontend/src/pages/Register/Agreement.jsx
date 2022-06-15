import React, { useState, useEffect } from 'react'
import './Register.css'
import { FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';

function Agreement() {

  const [allCheck, setAllCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [infoCollectionCheck, setInfoCollectionCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [progressCheck, setProgressCheck] = useState(false);
  const [fourteenCheck, setFourteenCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setServiceCheck(true);
      setInfoCollectionCheck(true);
      setMarketingCheck(true);
      setProgressCheck(true);
      setFourteenCheck(true);
    } else {
      setAllCheck(false);
      setServiceCheck(false);
      setInfoCollectionCheck(false);
      setMarketingCheck(false);
      setProgressCheck(false);
      setFourteenCheck(false);
    }
  };

  const serviceBtnEvent = () => {
    if (serviceCheck === false) {
      setServiceCheck(true)
    } else {
      setServiceCheck(false)
    }
  };

  const infoCollectionBtnEvent = () => {
    if (infoCollectionCheck === false) {
      setInfoCollectionCheck(true)
    } else {
      setInfoCollectionCheck(false)
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true)
    } else {
      setMarketingCheck(false)
    }
  };

  const progressBtnEvent = () => {
    if (progressCheck === false) {
      setProgressCheck(true)
    } else {
      setProgressCheck(false)
    }
  };
  const fourteenBtnEvent = () => {
    if (fourteenCheck === false) {
      setFourteenCheck(true)
    } else {
      setFourteenCheck(false)
    }
  };
  useEffect(() => {
    if (serviceCheck === true && infoCollectionCheck === true && marketingCheck === true && progressCheck === true && fourteenCheck === true) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [serviceCheck, infoCollectionCheck, marketingCheck, progressCheck, fourteenCheck])

  const handlesubmit = (event) => {
    event.preventDefualt();
  }

  return (
    // <div className="main-register">
    //   <div className="register-longContain">
        <div className="register-content">
          <form onSubmit={handlesubmit}>

            <h2 style={{ textAlign: 'left', marginLeft:"2rem" }}>약관 동의</h2>
            <div>
              <div>
                {/* <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
                  <label for="all-check">전체동의</label> */}
                <FormControlLabel control={<Checkbox value="all-check" color="default" size="small" checked={allCheck} onChange={allBtnEvent} />}
                  label="아래 약관에 모두 동의합니다." style={{ margin: '0.5rem 2rem'}} />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="service-check" color="default" size="small" checked={serviceCheck} onChange={serviceBtnEvent} />}
                  label="서비스 이용약관 동의 (필수)" style={{ marginLeft: '2rem' }} />
                <TextareaAutosize
                  maxRows={4}
                  readOnly
                  className='agreement-textArea'
                  defaultValue=" *제1조(목적) - 에브리데이 서비스 이용약관은 회사가 서비스를 제공함에 있어, 회사와 이용자 간의 권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다. *제2조(정의) - 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1)'회사'란 서비스를 제공하는 주체를 말합니다. 2)'서비스'란 회사가 제공하는 모든 서비스 및 기능을 말합니다. 3)'이용자'란 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다. *제3조(약관 등의 명시와 설명 및 개정) - 1)회사는 이 약관을 회원가입 화면 및 '내 정보' 메뉴 등에 게시합니다. 2)회사는 관려넙을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. *제4조(서비스의 제공) - 1)대학생활 편의 서비스 2)커뮤니티 서비스 3)대학, 문화, 활동, 취업 정보 제공 서비스 4)할인, 이벤트, 프로모션, 광고 정보 제공 서비스 *제5조(서비스 이용계약의 성립) - 회사와 회원의 서비스 이용계약은 서비스 내부의 회원가입 화면의 가입 양식에 따라 이용신청에 대하여, 서비스 화면에 이용승낙을 표시하는 방법 등으로 의사표시를 하면서 체결됩니다. *제6조(개인정보의 관리 및 보호) - 회원이 회사와 체결한 서비스 이용계약은 처음 이용계약을 체결한 본인에 한해 적용됩니다. *제7조(서비스 이용계약의 종료) - 회원은 언제든지 본인의 계정으로 로그인한 뒤 서비스 내부의 탈퇴하기 버튼을 누르는 방법으로 탈퇴를 요청할 수 있으며 문의 창구를 통한 탈퇴 요청 등은 처리되지 않습니다. 회사는 해당 요청을 확인한 후 탈퇴를 처리합니다. *제8조(회원에 대한 통보) - 회사가 회원에 대한 통보를 하는 경우 서비스 내부 알림 수단과 회원의 연락처를 이용합니다. *제9조(저작권의 귀속) - 회사는 전항 이외의 방법으로 회원의 게시물을 이용할 경우 서비스 내부 알림 수단과 회원의 연락처를 이용하여 회원의 동의를 받아야 합니다. *제10조(게시물의 게시 중단) - 회사는 관련법에 의거하여 회원의 게시물로 인한 법률상 이익침해를 근거로 다른 이용자 또는 제3자가 회원 또는 회사를 대상으로 하여 민형사상의 법적 조치를 취하거나 관련된 게시물의 게시중단을 요청하는 경우 회사는 해당 게시물에 대한 접근을 잠정적으로 제한하거나 삭제할 수 있습니다. *제11조(광고의 게재 및 발신) - 1)회사는 서비스의 제공을 위해 서비스 내부에 광고를 게재할 수 있습니다. 2)회사는 이용자의 이용 기록을 활용한 광고를 게재할 수 있습니다. *제12조(금지행위) - 이용자는 다음과 같은 행위를 해선 안됩니다. 1)개인정보 또는 계정 기만, 침해, 공유 행위 2)시스템 부정행위 3)업무 방해 행위 *제13조(재판권 및 준거법) - 회사와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 서울중앙지방법원을 관할 법원으로 합니다. 다만 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다. *제 14조(기타) - 이 약관은 2021년 2월 8일에 최신화 되었습니다. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관련법 또는 관례에 따릅니다. 이 약관에도 불고하고 다른 약관이나 서비스 이용 중 안내 문구 등으로 달리 정함이 있는 경우에는 해당 내용을 우선으로 합니다."
                />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="infoCollection-check" color="default" size="small" checked={infoCollectionCheck} onChange={infoCollectionBtnEvent} />}
                  label="개인정보 수집 및 이용 동의 (필수)" style={{ marginLeft: '2rem' }} />
                <TextareaAutosize
                  maxRows={4}
                  readOnly
                  className='agreement-textArea'
                  defaultValue=" *수집하는 개인정보의 항목 - 회사는 서비스 제공을 위해 회원가입 시점에 아래에 해당하는 개인정보를 수집합니다. 1)학교, 아이디 이메일, 이름, 휴대전화 번호, 통신사 정보, 생년월일, 성별 입학년도, 닉네임, 프로필 사진, 광고성 정보 수신 동의 여부, 타 서비스 로그인 고유번호, 연계정보(CI,DI) *수집한 개인정보의 이용 - 회원가입 시점에 수집된 개인정보는 아래 목적에 한해 이용됩니다. 1)가입 및 탈퇴 의사 확인, 회원 식별, 재학생 및 졸업생 확인 등 회원 관리 2)서비스 제공 및 기존-신규 시스템 개발, 유지, 개선 3)불법,약관 위반 게시물 게시 등 부정행위 방지를 위한 운영 시스템 개발, 유지, 개선 4)인구통계학적 자료 분석을 통한 맞춤형 콘텐츠 및 광고 제공 *수집한 개인정보의 보관 및 파기 - 회사는 서비스를 제공하는 동안 개인정보 취급방침 및 관련법에 의거하여 회원의 개인정보를 지속적으로 관리 및 보관합니다. 탈퇴 등으로 인해 개인정보 수집 및 이용목적이 달성될 경우, 수집된 개인정보는 즉시 또는 아래와 같이 일정기간 이후 파기됩니다. 1)가입 시 수집된 개인정보:탈퇴 후 14일 2)시간표, 친구 등 이용기록:탈퇴 시 즉시 파기 3)강의평가 포인트 내역:1년 4)로그기록:최대3년 *기타 - 자세한 내용은 웹사이트 하단에 게시된 개인정보처리방침을 참고하시기 바랍니다."
                />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="marketing-check" color="default" size="small" checked={marketingCheck} onChange={marketingBtnEvent} />}
                  label="광고성 정보 수신 동의 확인 (선택)" style={{ marginLeft: '2rem' }} />
                <TextareaAutosize
                  maxRows={4}
                  readOnly
                  className='agreement-textArea'
                  defaultValue=" 영화/전시 초대 이벤트, 대학생 특별 할인 혜택 등 다양한 이벤트 및 정보를 서비스에서 만나보실 수 있습니다. 1)항목:마케팅 수신동의 2)목적:서비스 및 이벤트 정보 안내 3)기간:탈퇴 후 최대1년"
                />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="progress-check" color="default" size="small" checked={progressCheck} onChange={progressBtnEvent} />}
                  label="본인 명의를 이용하여 가입을 진행하겠습니다." style={{ marginLeft: '2rem' }} />
                <TextareaAutosize
                  maxRows={4}
                  readOnly
                  className='agreement-textArea'
                  defaultValue=" 부모님, 친구 등 타인의 명의로 가입할 수 없습니다. 에브리데이는 철저한 학교 인증과 안전한 익명 커뮤니티를 제공하기 위해 가입 시 본인 인증 수단을 통해 본인 여부를 확인하고 커뮤니티 이용 시 증명 자료 제출을 통해 재학 여부를 확인합니다. 두 정보가 일치하지 않을 경우 서비스를 이용하실 수 없습니다."
                />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="fourteen-check" color="default" size="small" checked={fourteenCheck} onChange={fourteenBtnEvent} />}
                  label="만 14세 이상입니다." style={{ marginLeft: '2rem' }} />
                <TextareaAutosize
                  maxRows={4}
                  readOnly
                  className='agreement-textArea'
                  defaultValue=" 에브리데이는 국내 대학생을 위한 서비스이며, 본인 인증을 통해 만 14세 이상만 가입할 수 있습니다."
                />
              </div>

            </div>

            <Link to='/certification'><button className="emailAuth-btn" type="submit">이메일 인증</button></Link>


          </form>
        </div>
    //   </div>
    // </div>
  )
}

export default Agreement